import { describe, it, expect } from "vitest";
import { TitForTat, AlwaysCooperate, AlwaysDefect } from "./strategies";

describe("Strategy Tests", () => {
  it("TitForTat cooperates on first move", () => {
    expect(TitForTat.strategy([], [])).toBe("C");
  });

  it("TitForTat copies opponent last move", () => {
    const opponentHistory = [{ move: "D", payoff: 5 }];
    expect(TitForTat.strategy([], opponentHistory)).toBe("D");
  });

  it("AlwaysCooperate always returns C", () => {
    expect(AlwaysCooperate.strategy([], [])).toBe("C");
    expect(AlwaysCooperate.strategy([], [{ move: "D", payoff: 0 }])).toBe("C");
  });

  it("AlwaysDefect always returns D", () => {
    expect(AlwaysDefect.strategy([], [])).toBe("D");
    expect(AlwaysDefect.strategy([], [{ move: "C", payoff: 3 }])).toBe("D");
  });
});
