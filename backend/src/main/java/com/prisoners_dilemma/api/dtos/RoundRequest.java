package com.prisoners_dilemma.api.dtos;

public record RoundRequest(
    int roundNumber,
    String stratOneMove,
    String stratTwoMove,
    int stratOnePoints,
    int stratTwoPoints
) {}
