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

export const Grim: Strategy = {
  name: "Grim",
  description:
    "Cooperates until the opponent defects and thereafter always defects. Sometimes also called Spiteful.",
  strategy: (_selfHistory, opponentHistory) => {
    if (opponentHistory.length === 0) return "C";
    if (opponentHistory.some((value) => value.move === "D")) return "D";
    else return "C";
  },
};

export const SoftMajority: Strategy = {
  name: "Soft Majority",
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
export const HardMajority: Strategy = {
  name: "Hard Majority",
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

export const PeriodicDDC: Strategy = {
  name: "Periodic DDC",
  description: "Plays DDC periodically",
  strategy: (_selfHistory, opponentHistory) => {
    if (opponentHistory.length === 0) return "D";
    if ((opponentHistory.length + 1) % 3 === 0) return "C";
    else return "D";
  },
};

export const PeriodicCCD: Strategy = {
  name: "Periodic CCD",
  description: "Plays CCD periodically",
  strategy: (_selfHistory, opponentHistory) => {
    if (opponentHistory.length === 0) return "C";
    if ((opponentHistory.length + 1) % 3 === 0) return "D";
    else return "C";
  },
};
export const Alternator: Strategy = {
  name: "Alternator",
  description: "Alternates between cooperating and defecting",
  strategy: (_selfHistory, opponentHistory) => {
    if (opponentHistory.length === 0) return "C";
    if ((opponentHistory.length + 1) % 2 === 0) return "D";
    else return "C";
  },
};

export const SuspiciousTitforTat: Strategy = {
  name: "Suspicious Tit-for-Tat",
  description:
    "Defects on the first move then plays what the opponent played the previous move. Sometimes also called Mistrust.",
  strategy: (_selfHistory, opponentHistory) => {
    if (opponentHistory.length === 0) return "D";
    if (opponentHistory[opponentHistory.length - 1].move === "D") return "D";
    else return "C";
  },
};

export const Pavlov: Strategy = {
  name: "Pavlov",
  description:
    "Cooperates on the first move and defects only if both players do not agree on the previous move.",
  strategy: (selfHistory, opponentHistory) => {
    if (opponentHistory.length === 0) return "C";
    if (
      opponentHistory[opponentHistory.length - 1].move !=
      selfHistory[selfHistory.length - 1].move
    )
      return "D";
    else return "C";
  },
};

export const ReverseTitforTat: Strategy = {
  name: "Reverse Tit-for-Tat",
  description:
    "Defects first move, then plays the reverse of the opponent's previous move.",
  strategy: (_selfHistory, opponentHistory) => {
    if (opponentHistory.length === 0) return "D";
    if (opponentHistory[opponentHistory.length - 1].move === "D") return "C";
    else return "D";
  },
};

export const TitforTwoTats: Strategy = {
  name: "Tit for Two Tats",
  description: "Cooperates unless defected against twice in a row.",
  strategy: (_selfHistory, opponentHistory) => {
    if (opponentHistory.length < 2) return "C";
    if (
      opponentHistory[opponentHistory.length - 1].move === "D" &&
      opponentHistory[opponentHistory.length - 2].move === "D"
    )
      return "D";
    else return "C";
  },
};

export const TwoTitsforTat: Strategy = {
  name: "Two Tits-for-Tat",
  description:
    "Defects twice after being defected against, otherwise cooperates.",
  strategy: (selfHistory, opponentHistory) => {
    if (opponentHistory.length === 0) return "C";
    if (opponentHistory[opponentHistory.length - 1].move === "D") {
      return "D";
    }
    if (selfHistory[selfHistory.length - 1].move === "D") {
      return "D";
    }
    return "C";
  },
};

export const strategies: Strategy[] = [
  Alternator,
  AlwaysCooperate,
  AlwaysDefect,
  TitForTat,
  Random,
  Grim,
  HardMajority,
  SoftMajority,
  Pavlov,
  PeriodicCCD,
  PeriodicDDC,
  ReverseTitforTat,
  SuspiciousTitforTat,
  TitforTwoTats,
  TwoTitsforTat,
];
