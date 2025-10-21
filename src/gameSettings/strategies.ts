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

export const SoftMojo: Strategy = {
  name: "Soft Mojo",
  description:
    "Begins by cooperating and cooperates as long as the number of times the opponent has cooperated is greater or equal to the number of times it has defected. Otherwise will defect.",
  strategy: (_selfHistory, opponentHistory) => {
    if (opponentHistory.length === 0) return "C";
    let coopCount = 0;
    let defectCount = 0;
    for (let i = 0; i < opponentHistory.length; i++) {
      if (opponentHistory[i].move === "C") coopCount++;
      else defectCount++;
    }
    if (defectCount > coopCount) return "D";
    else return "C";
  },
};
export const HardMojo: Strategy = {
  name: "Hard Mojo",
  description:
    "Defects on the first move and defects if the number of defections of the opponent is greater than or equal to the number of times she has cooperated. Otherwise will cooperate",
  strategy: (_selfHistory, opponentHistory) => {
    if (opponentHistory.length === 0) return "D";
    let coopCount = 0;
    let defectCount = 0;
    for (let i = 0; i < opponentHistory.length; i++) {
      if (opponentHistory[i].move === "C") coopCount++;
      else defectCount++;
    }
    if (defectCount >= coopCount) return "D";
    else return "C";
  },
};

export const PerDDC: Strategy = {
  name: "PerDDC",
  description: "Plays DDC periodically",
  strategy: (_selfHistory, opponentHistory) => {
    if (opponentHistory.length === 0) return "D";
    if ((opponentHistory.length + 1) % 3 === 0) return "C";
    else return "D";
  },
};

export const PerCCD: Strategy = {
  name: "PerCCD",
  description: "Plays CCD periodically",
  strategy: (_selfHistory, opponentHistory) => {
    if (opponentHistory.length === 0) return "C";
    if ((opponentHistory.length + 1) % 3 === 0) return "D";
    else return "C";
  },
};
export const PerCD: Strategy = {
  name: "PerCD",
  description: "Plays CD periodically",
  strategy: (_selfHistory, opponentHistory) => {
    if (opponentHistory.length === 0) return "C";
    if ((opponentHistory.length + 1) % 2 === 0) return "D";
    else return "C";
  },
};

export const Mistrust: Strategy = {
  name: "Mistrust",
  description:
    "Defects on the first move then play what my opponent played the previous move. Sometimes also called suspicious_tft.",
  strategy: (_selfHistory, opponentHistory) => {
    if (opponentHistory.length === 0) return "D";
    if (opponentHistory[opponentHistory.length - 1].move === "D") return "D";
    else return "C";
  },
};

export const strategies: Strategy[] = [
  AlwaysCooperate,
  AlwaysDefect,
  TitForTat,
  Spiteful,
  Random,
  SoftMojo,
  PerDDC,
  PerCCD,
  PerCD,
  Mistrust,
  HardMojo,
];
