import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useGameLogic } from "./useGameLogic";
import DEFAULT_CONFIG from "../gameSettings/config";

// Mock the config if needed
vi.mock("../gameSettings/config", () => ({
  default: {
    maxRounds: 10,
    delay: 100,
    noise: false,
    noiseChance: 0.1,
    defaultStratOne: {
      name: "Always Cooperate",
      strategy: () => "C",
    },
    defaultStratTwo: {
      name: "Always Defect",
      strategy: () => "D",
    },
    payoffMatrix: {
      CC: [3, 3],
      CD: [0, 5],
      DC: [5, 0],
      DD: [1, 1],
    },
  },
}));

describe("useGameLogic", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useGameLogic());

    expect(result.current.currentRound).toBe(0);
    expect(result.current.scores).toEqual({ strat_one: 0, strat_two: 0 });
    expect(result.current.isRunning).toBe(false);
    expect(result.current.matchComplete).toBe(false);
    expect(result.current.maxRounds).toBe(DEFAULT_CONFIG.maxRounds);
  });

  it("should start the game and play first round instantly", () => {
    const { result } = renderHook(() => useGameLogic());

    act(() => {
      result.current.startGame();
    });

    expect(result.current.isRunning).toBe(true);
    expect(result.current.currentRound).toBe(1);
    expect(result.current.stratOneHistory).toHaveLength(1);
    expect(result.current.stratTwoHistory).toHaveLength(1);
    expect(result.current.payoff).toBe("05"); // C vs D = 0,5
  });

  it("should play subsequent rounds with delay", () => {
    const { result } = renderHook(() => useGameLogic());

    act(() => {
      result.current.startGame();
    });

    // First round plays instantly
    expect(result.current.currentRound).toBe(1);

    // Advance timer for second round
    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current.currentRound).toBe(2);
    expect(result.current.stratOneHistory).toHaveLength(2);
  });

  it("should accumulate scores correctly", () => {
    const { result } = renderHook(() => useGameLogic());

    act(() => {
      result.current.startGame();
    });

    // First round: C vs D = 0,5
    expect(result.current.currentRound).toBe(1);
    expect(result.current.scores).toEqual({ strat_one: 0, strat_two: 5 });

    // Second round
    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current.currentRound).toBe(2);
    expect(result.current.scores).toEqual({ strat_one: 0, strat_two: 10 });
  });

  it("should pause the game", () => {
    const { result } = renderHook(() => useGameLogic());

    act(() => {
      result.current.startGame();
    });

    expect(result.current.currentRound).toBe(1);

    act(() => {
      result.current.pauseGame();
    });

    expect(result.current.isRunning).toBe(false);

    const roundBeforePause = result.current.currentRound;

    // Advance time - round should not increase
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.currentRound).toBe(roundBeforePause);
  });

  it("should reset the game", () => {
    const { result } = renderHook(() => useGameLogic());

    act(() => {
      result.current.startGame();
    });

    expect(result.current.currentRound).toBe(1);

    act(() => {
      result.current.resetGame();
    });

    expect(result.current.currentRound).toBe(0);
    expect(result.current.scores).toEqual({ strat_one: 0, strat_two: 0 });
    expect(result.current.isRunning).toBe(false);
    expect(result.current.stratOneHistory).toHaveLength(0);
    expect(result.current.stratTwoHistory).toHaveLength(0);
    expect(result.current.payoff).toBeNull();
    expect(result.current.matchComplete).toBe(false);
  });

  it("should stop when max rounds reached", () => {
    const { result } = renderHook(() => useGameLogic());

    act(() => {
      result.current.updateMaxRounds(2);
      result.current.startGame();
    });

    // First round
    expect(result.current.currentRound).toBe(1);

    // Second round
    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current.currentRound).toBe(2);

    // Try to advance - should not play another round
    act(() => {
      vi.advanceTimersByTime(100);
    });

    // Should stop and mark complete
    expect(result.current.isRunning).toBe(false);
    expect(result.current.matchComplete).toBe(true);
    expect(result.current.currentRound).toBe(2);
  });

  it("should update delay", () => {
    const { result } = renderHook(() => useGameLogic());

    act(() => {
      result.current.updateDelay(500);
    });

    expect(result.current.delay).toBe(500);
  });

  it("should update max rounds", () => {
    const { result } = renderHook(() => useGameLogic());

    act(() => {
      result.current.updateMaxRounds(20);
    });

    expect(result.current.maxRounds).toBe(20);
  });

  it("should change strategies", () => {
    const { result } = renderHook(() => useGameLogic());

    const newStrategy = {
      name: "Tit for Tat",
      description: "Starts with “C”, then copies opponent's last move",
      strategy: vi.fn(() => "C"),
    };

    act(() => {
      result.current.setStrategyOne(newStrategy);
    });

    expect(result.current.strategyOne).toBe(newStrategy);
  });

  it("should apply noise when enabled", () => {
    // Mock Math.random to trigger noise
    const mockRandom = vi.spyOn(Math, "random");
    mockRandom.mockReturnValue(0.05); // Below noiseChance of 0.1

    const { result } = renderHook(() => useGameLogic());

    act(() => {
      result.current.setNoise(true);
      result.current.startGame();
    });

    // With noise, moves should be flipped
    // Original: C vs D, with noise both flipped: D vs C
    expect(result.current.currentRound).toBe(1);
    expect(result.current.payoff).toBe("50"); // D vs C = 5,0

    mockRandom.mockRestore();
  });
});
