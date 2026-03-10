package com.prisoners_dilemma.api.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prisoners_dilemma.api.dtos.CreateMatchRequestDTO;
import com.prisoners_dilemma.api.dtos.MatchResponseDTO;
import com.prisoners_dilemma.api.services.MatchService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/matches")
@RequiredArgsConstructor
public class MatchController {
    private final MatchService matchService;

    @PostMapping
    public ResponseEntity<MatchResponseDTO> saveMatch(@RequestBody @Validated CreateMatchRequestDTO request){
        return ResponseEntity.status(HttpStatus.CREATED).body(matchService.saveMatch(request));
    }

    @GetMapping
    public ResponseEntity<List<MatchResponseDTO>> getAllMatches(){
        return ResponseEntity.ok(matchService.getAllMatches());
    }
}
