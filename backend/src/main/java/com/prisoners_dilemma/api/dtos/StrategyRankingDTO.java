package com.prisoners_dilemma.api.dtos;

import com.prisoners_dilemma.api.entities.Strategy;

public record StrategyRankingDTO(
    int rank,
    Strategy strategyName,
    int totalMatches,
    int totalRounds,
    int wins,
    int losses,
    double winRate,
    int totalPoints,
    double avgPointsPerMatch
) {
    
}
