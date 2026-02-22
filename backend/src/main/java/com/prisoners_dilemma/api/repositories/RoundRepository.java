package com.prisoners_dilemma.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prisoners_dilemma.api.entities.Match;
import com.prisoners_dilemma.api.entities.Round;

public interface RoundRepository extends JpaRepository<Round, Long>{
    List<Round> findByMatch(Match match);
}
