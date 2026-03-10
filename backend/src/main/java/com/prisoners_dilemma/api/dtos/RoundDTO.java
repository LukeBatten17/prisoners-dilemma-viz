package com.prisoners_dilemma.api.dtos;

public record RoundDTO(
    int roundNumber,
    String strategyOneMove,
    String strategyTwoMove,
    int strategyOnePoints,
    int strategyTwoPoints,
    boolean strategyOneAffectedByNoise,
    boolean strategyTwoAffectedByNoise
) {}
