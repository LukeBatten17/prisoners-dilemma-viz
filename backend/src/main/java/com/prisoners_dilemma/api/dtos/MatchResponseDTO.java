package com.prisoners_dilemma.api.dtos;
import java.util.List;
import java.time.LocalDateTime;

public record MatchResponseDTO(    
    Long id,
    String strategyOneId,
    String strategyTwoId,
    int strategyOnePoints,
    int strategyTwoPoints,
    int totalRounds,
    String winner,
    boolean noise,
    List<RoundDTO> rounds,
    LocalDateTime playedAt
    ) {}
