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
  summary: SummaryData;
  recentMatches: RecentMatch[];
  rankings: Ranking[];
}

export interface SummaryData {
  topStrategy: string;
  totalMatches: number;
  totalRounds: number;
  avgPointsPerMatch: number;
}

export interface RecentMatch {
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
}

export interface Ranking {
  rank: number;
  strategyName: string;
  totalMatches: number;
  totalPoints: number;
  avgPointsPerMatch: number;
  wins: number;
  losses: number;
  draws?: number;
  winRate: number;
}
