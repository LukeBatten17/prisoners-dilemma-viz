export type Move = "C" | "D" | string;

export interface HistoryEntry {
  move: Move;
  payoff: number;
  affectedByNoise: boolean;
}

export interface Strategy {
  id: string;
  name: string;
  description: string;
  strategy: (
    selfHistory: HistoryEntry[],
    opponentHistory: HistoryEntry[],
  ) => Move;
}

export interface LeaderboardData {
  summary: SummaryData;
  recentMatches: RecentMatch[];
  rankings: Ranking[];
}

export interface SummaryData {
  topStrategy: string;
  totalMatches: number;
  totalRounds: number;
  avgPointsPerRound: number;
  topStrategyAvgPointsPerRound: number;
}

export interface RecentMatch {
  id: string;
  strategyOneName: string;
  strategyTwoName: string;
  strategyOnePoints: number;
  strategyTwoPoints: number;
  totalRounds: number;
  winner: string;
  noise: boolean;
  rounds: HistoryEntry[];
  playedAt: string;
}

export interface Ranking {
  rank: number;
  strategyName: string;
  totalMatches: number;
  totalPoints: number;
  avgPointsPerMatch: number;
  wins: number;
  losses: number;
  draws: number;
  successRate: number;
}
