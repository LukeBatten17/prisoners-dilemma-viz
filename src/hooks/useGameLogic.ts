import { useEffect, useState } from "react";
import DEFAULT_CONFIG from "../gameSettings/config";
import type { HistoryEntry } from "../gameSettings/types";

export function useGameLogic() {
  const [currentRound, setCurrentRound] = useState(0);
  const [scores, setScores] = useState({ strat_one: 0, strat_two: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [maxRounds, setMaxRounds] = useState(DEFAULT_CONFIG.maxRounds);
  const [delay, setDelay] = useState(DEFAULT_CONFIG.delay);
  const [payoff, setPayoff] = useState<string | null>(null);
  const [matchComplete, setMatchComplete] = useState(false);
  const [noise, setNoise] = useState(DEFAULT_CONFIG.noise);

  const [stratOneHistory, setStratOneHistory] = useState<HistoryEntry[]>([]);
  const [stratTwoHistory, setStratTwoHistory] = useState<HistoryEntry[]>([]);

  const [strategyOne, setStrategyOne] = useState(
    DEFAULT_CONFIG.defaultStratOne
  );
  const [strategyTwo, setStrategyTwo] = useState(
    DEFAULT_CONFIG.defaultStratTwo
  );

  try {
    useEffect(() => {
      if (currentRound >= maxRounds) {
        setIsRunning(false);
        setMatchComplete(true);
        return;
      }
      if (!isRunning) return;

      const playRound = () => {
        let move_one = strategyOne.strategy(stratOneHistory, stratTwoHistory);
        let move_two = strategyTwo.strategy(stratTwoHistory, stratOneHistory);

        // Simulate noise
        if (noise) {
          const noiseChance = DEFAULT_CONFIG.noiseChance;
          if (Math.random() < noiseChance) {
            move_one = move_one === "C" ? "D" : "C";
            console.log("Noise altered move one");
          }
          if (Math.random() < noiseChance) {
            move_two = move_two === "C" ? "D" : "C";
            console.log("Noise altered move two");
          }
        }

        const key =
          `${move_one}${move_two}` as keyof typeof DEFAULT_CONFIG.payoffMatrix;
        const [payoff_one, payoff_two] = DEFAULT_CONFIG.payoffMatrix[key];

        setPayoff(`${payoff_one}${payoff_two}`);
        setStratOneHistory((prev) => [
          ...prev,
          { move: move_one, payoff: payoff_one },
        ]);
        setStratTwoHistory((prev) => [
          ...prev,
          { move: move_two, payoff: payoff_two },
        ]);
        setScores((prev) => ({
          strat_one: prev.strat_one + payoff_one,
          strat_two: prev.strat_two + payoff_two,
        }));
        setCurrentRound((prev) => prev + 1);
      };
      if (currentRound === 0) {
        playRound(); // instant first round
      } else {
        const timer = setTimeout(playRound, delay);
        return () => clearTimeout(timer);
      }
    }, [
      isRunning,
      currentRound,
      stratOneHistory,
      stratTwoHistory,
      strategyOne,
      strategyTwo,
      delay,
      maxRounds,
    ]);
  } catch (e) {
    console.error(e);
    setIsRunning(false);
  }

  const resetGame = () => {
    setIsRunning(false);
    setCurrentRound(0);
    setScores({ strat_one: 0, strat_two: 0 });
    setStratOneHistory([]);
    setStratTwoHistory([]);
    setPayoff(null);
    setMatchComplete(false);
  };

  const startGame = () => setIsRunning(true);
  const pauseGame = () => setIsRunning(false);
  const updateMaxRounds = (rounds: number) => setMaxRounds(rounds);
  const updateDelay = (newDelay: number) => setDelay(newDelay);

  return {
    currentRound,
    stratOneHistory,
    stratTwoHistory,
    scores,
    isRunning,
    maxRounds,
    delay,
    strategyOne,
    strategyTwo,
    resetGame,
    startGame,
    pauseGame,
    updateMaxRounds,
    updateDelay,
    setStrategyOne,
    setStrategyTwo,
    payoff,
    matchComplete,
    setNoise,
  };
}
