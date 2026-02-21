export type Move = "C" | "D" | string;

export interface HistoryEntry {
  move: Move;
  payoff: number;
}

export interface Strategy {
  name: string;
  description: string;
  strategy: (
    selfHistory: HistoryEntry[],
    opponentHistory: HistoryEntry[]
  ) => Move;
}
