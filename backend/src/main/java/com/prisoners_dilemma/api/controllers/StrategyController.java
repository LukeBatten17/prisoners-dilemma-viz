package com.prisoners_dilemma.api.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prisoners_dilemma.api.entities.Strategy;
import com.prisoners_dilemma.api.services.StrategyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/strategies")
@RequiredArgsConstructor
public class StrategyController {
    private final StrategyService strategyService;

    @GetMapping
    public ResponseEntity<List<Strategy>> getAllStrategies() {
        return ResponseEntity.ok(strategyService.getAllStrategies());
    }
}
