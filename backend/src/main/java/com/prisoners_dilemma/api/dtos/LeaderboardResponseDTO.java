package com.prisoners_dilemma.api.dtos;

import java.util.List;

public record LeaderboardResponseDTO(    
    List<StrategyRankingDTO> rankings,
    List<MatchResponseDTO> recentMatches,
    LeaderboardSummary summary) 
    {}
