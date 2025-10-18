import type { Strategy } from "../gameSettings/types";

export const AlwaysCooperate: Strategy = {
  name: "Always Cooperate",
  description: "Always chooses to cooperate.",
  strategy: () => "C",
};

export const AlwaysDefect: Strategy = {
  name: "Always Defect",
  description: "Always chooses to defect.",
  strategy: () => "D",
};

export const TitForTat: Strategy = {
  name: "Tit-for-Tat",
  description: "Starts with “C”, then copies opponent's last move",
  strategy: (_selfHistory, opponentHistory) => {
    if (opponentHistory.length === 0) return "C";
    if (opponentHistory[opponentHistory.length - 1].move === "D") return "D";
    else return "C";
  },
};

export const Random: Strategy = {
  name: "Random",
  description: "Randomly plays “C” or “D” each round",
  strategy: () => {
    return Math.random() < 0.5 ? "C" : "D";
  },
};

export const Spiteful: Strategy = {
  name: "Spiteful",
  description:
    "Cooperates until the opponent defects and thereafter always defect. Sometimes also called grim.",
  strategy: (_selfHistory, opponentHistory) => {
    if (opponentHistory.length === 0) return "C";
    if (opponentHistory.some((value) => value.move === "D")) return "D";
    else return "C";
  },
};

export const strategies: Strategy[] = [
  AlwaysCooperate,
  AlwaysDefect,
  TitForTat,
  Spiteful,
  Random,
];
