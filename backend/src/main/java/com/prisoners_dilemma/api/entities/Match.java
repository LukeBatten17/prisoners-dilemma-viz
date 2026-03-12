package com.prisoners_dilemma.api.entities;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name="matches")
@EntityListeners(AuditingEntityListener.class)
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
    @JoinColumn(name = "strategy_one_id", nullable = false)
    private Strategy strategyOne;

    @ManyToOne
    @JoinColumn(name = "strategy_two_id", nullable = false)
    private Strategy strategyTwo;

    @Column(nullable = false)
    private int strategyOnePoints;

    @Column(nullable = false)
    private int strategyTwoPoints;

    @Column(nullable = false)
    private int totalRounds;

    @Column(nullable = false)
    private boolean noise;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime playedAt;

    // Winner can be null in case of a tie
    @ManyToOne
    @JoinColumn(name = "winner_id", nullable = true)
    private Strategy winner;

    @OneToMany(mappedBy = "match", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Round> rounds;

}
