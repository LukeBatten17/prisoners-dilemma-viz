package com.prisoners_dilemma.api.entities;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name="matches")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "strat_one_id", nullable = false)
    private Strategy stratOne;
    
    @ManyToOne
    @JoinColumn(name = "strat_two_id", nullable = false)
    private Strategy stratTwo;

    @Column(nullable = false)
    private int stratOnePoints;

    @Column(nullable = false)
    private int stratTwoPoints;

    @Column(nullable = false)
    private int totalRounds;

    @Column(nullable = false)
    private boolean noise;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime playedAt;

    @ManyToOne
    @JoinColumn(name = "winner_id", nullable = false)
    private Strategy winner;



}
