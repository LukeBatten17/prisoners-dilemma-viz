package com.prisoners_dilemma.api.dtos;

import java.time.LocalDateTime;

public record MatchResponse(    
    Long id,
    String strategyOne,
    String strategyTwo,
    int stratOnePoints,
    int stratTwoPoints,
    int totalRounds,
    String winner,
    boolean noise,
    LocalDateTime playedAt
    ) {}
