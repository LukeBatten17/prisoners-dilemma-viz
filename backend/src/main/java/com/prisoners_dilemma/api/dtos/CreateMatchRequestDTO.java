package com.prisoners_dilemma.api.dtos;
import java.util.List;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;


public record CreateMatchRequestDTO(
    @NotEmpty
    String strategyOneId,

    @NotEmpty
    String strategyTwoId,

    @NotNull
    Integer strategyOnePoints,

    @NotNull
    Integer strategyTwoPoints,

    @NotNull 
    @Min(1) 
    @Max(200)
    Integer totalRounds,

    String winnerId,

    boolean noise,

    @DecimalMin("0.0")
    @DecimalMax("1.0")
    double noiseChance,

    @NotEmpty @Size(min = 1, max = 200) 
    List<RoundDTO> rounds
) {}
