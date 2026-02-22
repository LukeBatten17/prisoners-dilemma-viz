package com.prisoners_dilemma.api.dtos;
import java.util.List;


public record MatchRequest(
    String strategyOneName,
    String strategyTwoName,
    int stratOnePoints,
    int stratTwoPoints,
    int totalRounds,
    String winner,
    boolean noise,
    List<RoundRequest> rounds
) {}
