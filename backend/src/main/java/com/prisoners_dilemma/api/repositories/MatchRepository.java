package com.prisoners_dilemma.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prisoners_dilemma.api.entities.Match;
import com.prisoners_dilemma.api.entities.Strategy;

public interface MatchRepository extends JpaRepository<Match, Long>{
        List<Match> findByStratOneOrStratTwo(Strategy stratOne, Strategy stratTwo);

}
