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
    opponentHistory: HistoryEntry[],
  ) => Move;
}

export interface LeaderboardData {
  summary: {
    totalMatches: number;
    topStrategy: string;
    totalRounds: number;
    avgPointsPerMatch: number;
  };
  recentMatches: {
    id: string;
    strategyOneId: string;
    strategyTwoId: string;
    strategyOnePoints: number;
    strategyTwoPoints: number;
    totalRounds: number;
    winner: string;
    noise: boolean;
    rounds: HistoryEntry[];
    playedAt: string;
  }[];
  rankings: {
    rank: number;
    strategyName: string;
    totalMatches: number;
    totalPoints: number;
    avgPointsPerMatch: number;
    wins: number;
    losses: number;
    draws?: number;
    winRate: number;
  }[];
}
