CREATE TABLE IF NOT EXISTS strategies (
    id VARCHAR(120) PRIMARY KEY,
    name VARCHAR(120) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS matches (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    strategy_one_id VARCHAR(120) NOT NULL,
    strategy_two_id VARCHAR(120) NOT NULL,
    strategy_one_points INT NOT NULL,
    strategy_two_points INT NOT NULL,
    total_rounds INT NOT NULL CHECK (total_rounds > 0),
    noise BOOLEAN NOT NULL DEFAULT FALSE,
    noise_chance DOUBLE PRECISION NOT NULL DEFAULT 0.0 CHECK (noise_chance >= 0 AND noise_chance <= 1),
    played_at TIMESTAMP NOT NULL DEFAULT NOW(),
    winner_id VARCHAR(120),
    CONSTRAINT fk_match_strategy_one FOREIGN KEY (strategy_one_id) REFERENCES strategies(id),
    CONSTRAINT fk_match_strategy_two FOREIGN KEY (strategy_two_id) REFERENCES strategies(id),
    CONSTRAINT fk_match_winner FOREIGN KEY (winner_id) REFERENCES strategies(id)
);

CREATE TABLE IF NOT EXISTS rounds (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    match_id BIGINT NOT NULL,
    round_number INT NOT NULL CHECK (round_number > 0),
    strategy_one_move VARCHAR(20) NOT NULL CHECK (strategy_one_move IN ('C', 'D')),
    strategy_two_move VARCHAR(20) NOT NULL CHECK (strategy_two_move IN ('C', 'D')),
    strategy_one_points INT NOT NULL,
    strategy_two_points INT NOT NULL,
    strategy_one_affected_by_noise BOOLEAN DEFAULT FALSE,
    strategy_two_affected_by_noise BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_round_match FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE,
    CONSTRAINT uq_round_match_number UNIQUE (match_id, round_number)
);
