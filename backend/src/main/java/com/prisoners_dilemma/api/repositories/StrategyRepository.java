package com.prisoners_dilemma.api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prisoners_dilemma.api.entities.Strategy;

public interface StrategyRepository extends JpaRepository<Strategy, Long>{
    Optional<Strategy> findByName(String name);
}
