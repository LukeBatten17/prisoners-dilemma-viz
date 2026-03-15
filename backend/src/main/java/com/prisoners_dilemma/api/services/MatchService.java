package com.prisoners_dilemma.api.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.prisoners_dilemma.api.dtos.CreateMatchRequestDTO;
import com.prisoners_dilemma.api.dtos.MatchResponseDTO;
import com.prisoners_dilemma.api.dtos.RoundDTO;
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
    public MatchResponseDTO saveMatch(CreateMatchRequestDTO request) {

        //Since a must reach total rounds to be added. 
        if (request.rounds().size() != request.totalRounds()) {
            throw new IllegalArgumentException("Round count does not match totalRounds");
        }

        //Winnder must be either strategy one or strategy two or null if draw
        if (request.winnerId() != null && 
            !request.winnerId().equals(request.strategyOneId()) && 
            !request.winnerId().equals(request.strategyTwoId())) {
            throw new IllegalArgumentException("Winner must be one of the two strategies");
        }

        for (RoundDTO r : request.rounds()) {
            boolean valid = (r.strategyOnePoints() == 3 && r.strategyTwoPoints() == 3) ||
                            (r.strategyOnePoints() == 0 && r.strategyTwoPoints() == 5) ||
                            (r.strategyOnePoints() == 5 && r.strategyTwoPoints() == 0) ||
                            (r.strategyOnePoints() == 1 && r.strategyTwoPoints() == 1);
            if (!valid) throw new IllegalArgumentException("Invalid points in round " + r.roundNumber());
        }

        int expectedOne = request.rounds().stream().mapToInt(RoundDTO::strategyOnePoints).sum();
        int expectedTwo = request.rounds().stream().mapToInt(RoundDTO::strategyTwoPoints).sum();
        if (request.strategyOnePoints() != expectedOne || request.strategyTwoPoints() != expectedTwo) {
            throw new IllegalArgumentException("Total points do not match sum of rounds");
        }


        Strategy strategyOne = strategyService.getById(request.strategyOneId());
        Strategy strategyTwo = strategyService.getById(request.strategyTwoId());
        Strategy winner = request.winnerId() != null ? strategyService.getById(request.winnerId()) : null;


        Match match = Match.builder()
            .strategyOne(strategyOne)
            .strategyTwo(strategyTwo)
            .strategyOnePoints(request.strategyOnePoints())
            .strategyTwoPoints(request.strategyTwoPoints())
            .totalRounds(request.totalRounds())
            .winner(winner)
            .noise(request.noise())
            .build();
    
        Match saved = matchRepository.save(match);

        List<Round> rounds = request.rounds().stream()
            .map(r -> Round.builder()
                .match(saved)
                .roundNumber(r.roundNumber())
                .strategyOneMove(Move.valueOf(r.strategyOneMove()))
                .strategyTwoMove(Move.valueOf(r.strategyTwoMove()))
                .strategyOnePoints(r.strategyOnePoints())
                .strategyTwoPoints(r.strategyTwoPoints())
                .strategyOneAffectedByNoise(r.strategyOneAffectedByNoise())
                .strategyTwoAffectedByNoise(r.strategyTwoAffectedByNoise())
                .build())
            .toList();

        roundRepository.saveAll(rounds);

        List<RoundDTO> roundDTOs = rounds.stream()
            .map(r -> new RoundDTO(
                r.getRoundNumber(),
                r.getStrategyOneMove().name(),
                r.getStrategyTwoMove().name(),
                r.getStrategyOnePoints(),
                r.getStrategyTwoPoints(),
                r.isStrategyOneAffectedByNoise(),
                r.isStrategyTwoAffectedByNoise()
            ))
            .toList();

        return new MatchResponseDTO(
            saved.getId(),
            strategyOne.getId(),
            strategyTwo.getId(),
            saved.getStrategyOnePoints(),
            saved.getStrategyTwoPoints(),
            saved.getTotalRounds(),
            winner != null ? winner.getName() : null,
            saved.isNoise(),
            roundDTOs,
            saved.getPlayedAt()
        );
    }

    @Transactional
    public List<MatchResponseDTO> getAllMatches() {
        return matchRepository.findAll().stream()
            .map(m -> new MatchResponseDTO(
                m.getId(),
                m.getStrategyOne().getId(),
                m.getStrategyTwo().getId(),
                m.getStrategyOnePoints(),
                m.getStrategyTwoPoints(),
                m.getTotalRounds(),
                m.getWinner() != null ? m.getWinner().getName() : null,
                m.isNoise(),
                m.getRounds().stream()
                    .map(r -> new RoundDTO(
                        r.getRoundNumber(),
                        r.getStrategyOneMove().name(),
                        r.getStrategyTwoMove().name(),
                        r.getStrategyOnePoints(),
                        r.getStrategyTwoPoints(),
                        r.isStrategyOneAffectedByNoise(),
                        r.isStrategyTwoAffectedByNoise()
                    ))
                    .toList(),
                m.getPlayedAt()
            ))
            .toList();
    }
}
