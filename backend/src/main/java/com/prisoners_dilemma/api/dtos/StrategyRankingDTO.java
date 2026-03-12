package com.prisoners_dilemma.api.dtos;

public record StrategyRankingDTO(
    int rank,
    String strategyName,
    int totalMatches,
    int totalRounds,
    int wins,
    int losses,
    int draws,
    double winRate,
    int totalPoints,
    double avgPointsPerMatch
) {
    
}
