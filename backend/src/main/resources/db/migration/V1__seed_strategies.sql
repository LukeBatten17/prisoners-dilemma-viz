INSERT INTO strategies (name, description, created_at) VALUES
('Tit for Tat', 'Cooperates on the first move, then copies the opponent''s last move.', NOW()),
('Always Cooperate', 'Always cooperates regardless of the opponent''s moves.', NOW()),
('Always Defect', 'Always defects regardless of the opponent''s moves.', NOW()),
('Random', 'Randomly cooperates or defects with equal probability.', NOW()),
('Grudger', 'Cooperates until the opponent defects, then always defects.', NOW()),
('Pavlov', 'Cooperates if both players made the same move last round, otherwise defects.', NOW());