package com.prisoners_dilemma.api.dtos;
import java.util.List;


public record CreateMatchRequestDTO(
    String strategyOneId,
    String strategyTwoId,
    int strategyOnePoints,
    int strategyTwoPoints,
    int totalRounds,
    String winnerId,
    boolean noise,
    List<RoundDTO> rounds
) {}
