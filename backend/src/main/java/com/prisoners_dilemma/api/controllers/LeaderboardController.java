package com.prisoners_dilemma.api.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prisoners_dilemma.api.dtos.LeaderboardResponseDTO;
import com.prisoners_dilemma.api.services.LeaderboardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/leaderboard")
@RequiredArgsConstructor
public class LeaderboardController {
    private final LeaderboardService leaderboardService;

    @GetMapping
    public ResponseEntity<LeaderboardResponseDTO> getLeaderboard(){
        return ResponseEntity.ok(leaderboardService.getLeaderboard());
    } 
}
