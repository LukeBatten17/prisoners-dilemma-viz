package com.prisoners_dilemma.api.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.prisoners_dilemma.api.entities.Strategy;
import com.prisoners_dilemma.api.repositories.StrategyRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StrategyService {
    private final StrategyRepository strategyRepository;

    public List<Strategy> getAllStrategies(){
        return strategyRepository.findAll();
    }

    public Strategy getByName(String name) {
        return strategyRepository.findByName(name)
            .orElseThrow(() -> new RuntimeException("Strategy not found: " + name));
    }
}
