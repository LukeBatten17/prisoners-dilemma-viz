package com.prisoners_dilemma.api.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.prisoners_dilemma.api.dtos.MatchRequest;
import com.prisoners_dilemma.api.dtos.MatchResponse;
import com.prisoners_dilemma.api.entities.Match;
import com.prisoners_dilemma.api.entities.Move;
import com.prisoners_dilemma.api.entities.Round;
import com.prisoners_dilemma.api.entities.Strategy;
import com.prisoners_dilemma.api.repositories.MatchRepository;
import com.prisoners_dilemma.api.repositories.RoundRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MatchService {
    
    private final MatchRepository matchRepository;
    private final RoundRepository roundRepository;
    private final StrategyService strategyService;

    @Transactional
    public MatchResponse saveMatch(MatchRequest request) {
        Strategy stratOne = strategyService.getByName(request.strategyOneName());
        Strategy stratTwo = strategyService.getByName(request.strategyTwoName());
        Strategy winner = strategyService.getByName(request.winner());

        Match match = Match.builder()
            .stratOne(stratOne)
            .stratTwo(stratTwo)
            .stratOnePoints(request.stratOnePoints())
            .stratTwoPoints(request.stratTwoPoints())
            .totalRounds(request.totalRounds())
            .winner(winner)
            .noise(request.noise())
            .build();
    
        Match saved = matchRepository.save(match);

        List<Round> rounds = request.rounds().stream()
            .map(r -> Round.builder()
                .match(saved)
                .roundNumber(r.roundNumber())
                .stratOneMove(Move.valueOf(r.stratOneMove()))
                .stratTwoMove(Move.valueOf(r.stratTwoMove()))
                .stratOnePoints(r.stratOnePoints())
                .stratTwoPoints(r.stratTwoPoints())
                .build())
            .toList();

        roundRepository.saveAll(rounds);

        return new MatchResponse(            
            saved.getId(),
            stratOne.getName(),
            stratTwo.getName(),
            saved.getStratOnePoints(),
            saved.getStratTwoPoints(),
            saved.getTotalRounds(),
            winner.getName(),
            saved.isNoise(),
            saved.getPlayedAt()
        );
    }
    public List<MatchResponse> getAllMatches() {
        return matchRepository.findAll().stream()
            .map(m -> new MatchResponse(
                m.getId(),
                m.getStratOne().getName(),
                m.getStratTwo().getName(),
                m.getStratOnePoints(),
                m.getStratTwoPoints(),
                m.getTotalRounds(),
                m.getWinner().getName(),
                m.isNoise(),
                m.getPlayedAt()
            ))
            .toList();
    }
}
