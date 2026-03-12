package com.prisoners_dilemma.api.dtos;

public record LeaderboardSummary(
    int totalMatches,
    int totalRounds,
    String topStrategy,
    double topStrategyAvgPointsPerRound,
    double avgPointsPerRound
) {}
