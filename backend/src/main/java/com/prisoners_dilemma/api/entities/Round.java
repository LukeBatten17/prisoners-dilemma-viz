package com.prisoners_dilemma.api.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name="rounds")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Round {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "match_id", nullable = false)
    private Match match;

    @Column(nullable = false)
    private int roundNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Move strategyOneMove;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Move strategyTwoMove;

    @Column(nullable = false)
    private int strategyOnePoints;

    @Column(nullable = false)
    private int strategyTwoPoints; 
    
    @Builder.Default
    private boolean strategyOneAffectedByNoise = false;

    @Builder.Default
    private boolean strategyTwoAffectedByNoise = false;

}
