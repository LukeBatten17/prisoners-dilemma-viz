CREATE TABLE IF NOT EXISTS strategies (
    id VARCHAR(120) PRIMARY KEY,
    name VARCHAR(120) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS matches (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    strat_one_id VARCHAR(120) NOT NULL,
    strat_two_id VARCHAR(120) NOT NULL,
    strat_one_points INT NOT NULL,
    strat_two_points INT NOT NULL,
    total_rounds INT NOT NULL CHECK (total_rounds > 0),
    noise BOOLEAN NOT NULL DEFAULT FALSE,
    played_at TIMESTAMP NOT NULL DEFAULT NOW(),
    winner_id VARCHAR(120) NOT NULL,
    CONSTRAINT fk_match_strat_one FOREIGN KEY (strat_one_id) REFERENCES strategies(id),
    CONSTRAINT fk_match_strat_two FOREIGN KEY (strat_two_id) REFERENCES strategies(id),
    CONSTRAINT fk_match_winner FOREIGN KEY (winner_id) REFERENCES strategies(id)
);

CREATE TABLE IF NOT EXISTS rounds (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    match_id BIGINT NOT NULL,
    round_number INT NOT NULL CHECK (round_number > 0),
    strat_one_move VARCHAR(20) NOT NULL CHECK (strat_one_move IN ('COOPERATE', 'DEFECT')),
    strat_two_move VARCHAR(20) NOT NULL CHECK (strat_two_move IN ('COOPERATE', 'DEFECT')),
    strat_one_points INT NOT NULL,
    strat_two_points INT NOT NULL,
    CONSTRAINT fk_round_match FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE,
    CONSTRAINT uq_round_match_number UNIQUE (match_id, round_number)
);
