package com.prisoners_dilemma.api.services;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;

import com.prisoners_dilemma.api.dtos.LeaderboardResponseDTO;
import com.prisoners_dilemma.api.dtos.LeaderboardSummary;
import com.prisoners_dilemma.api.dtos.MatchResponseDTO;
import com.prisoners_dilemma.api.dtos.RoundDTO;
import com.prisoners_dilemma.api.dtos.StrategyRankingDTO;
import com.prisoners_dilemma.api.entities.Match;
import com.prisoners_dilemma.api.entities.Strategy;
import com.prisoners_dilemma.api.repositories.MatchRepository;
import com.prisoners_dilemma.api.repositories.StrategyRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LeaderboardService {
    private final MatchRepository matchRepository;
    private final StrategyRepository strategyRepository;

    @Transactional
    public LeaderboardResponseDTO getLeaderboard() {
        List<Strategy> strategies = strategyRepository.findAll();
        List<Match> matches = matchRepository.findAll();

        List<StrategyRankingDTO> rankings = new ArrayList<>();
        int overallTotalPoints = 0;

        for (Strategy s : strategies) {
            List<Match> strategyMatches = matches.stream()
                .filter(m -> m.getStrategyOne().equals(s) || m.getStrategyTwo().equals(s))
                .toList();

            if (strategyMatches.isEmpty()) continue;

            int wins = 0, draws = 0, totalPoints = 0, totalRounds = 0;
            for (Match m : strategyMatches) {
                if (s.equals(m.getWinner())) wins++;
                else if (m.getWinner() == null) draws++;
                totalPoints += m.getStrategyOne().equals(s) ? m.getStrategyOnePoints() : m.getStrategyTwoPoints();
                totalRounds += m.getTotalRounds();
            }

            int totalMatches = strategyMatches.size();
            double successRate = (double) (wins + draws) / totalMatches;
            double avgPointsPerRound = totalRounds > 0 ? (double) totalPoints / totalRounds : 0;
            overallTotalPoints += totalPoints;

            rankings.add(new StrategyRankingDTO(0,
                s.getName(), totalMatches, totalRounds, wins,
                totalMatches - wins - draws, draws, successRate, totalPoints, avgPointsPerRound
             ));
        }

        // Sort by avg points per round, then by success rate as tiebreaker
        rankings.sort(Comparator.comparingDouble(StrategyRankingDTO::avgPointsPerRound)
            .thenComparingDouble(StrategyRankingDTO::successRate).reversed());

        // Assign ranks 
        List<StrategyRankingDTO> ranked = new ArrayList<>();
        for (int i = 0; i < rankings.size(); i++) {
            StrategyRankingDTO r = rankings.get(i);
            ranked.add(new StrategyRankingDTO(
                i + 1, r.strategyName(), r.totalMatches(), r.totalRounds(),
                r.wins(), r.losses(), r.draws(), r.successRate(), r.totalPoints(), r.avgPointsPerRound()
            ));
        }

        // 10 most recent matches
        List<MatchResponseDTO> recentMatches = matchRepository.findTop10ByOrderByPlayedAtDesc().stream()
            .map(m -> new MatchResponseDTO(
                m.getId(),
                m.getStrategyOne().getName(),
                m.getStrategyTwo().getName(),
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

        int totalRoundsOverall = matches.stream().mapToInt(Match::getTotalRounds).sum();
        String topStrategy = ranked.isEmpty() ? null : ranked.get(0).strategyName();
        double topStrategyAvgPointsPerRound = ranked.isEmpty() ? 0 : ranked.get(0).avgPointsPerRound();

        LeaderboardSummary summary = new LeaderboardSummary(
            matches.size(), 
            totalRoundsOverall, 
            topStrategy, 
            topStrategyAvgPointsPerRound, 
            overallTotalPoints > 0 && totalRoundsOverall > 0 ? (double) overallTotalPoints / totalRoundsOverall : 0
        );

        return new LeaderboardResponseDTO(ranked, recentMatches, summary);
    }
}
