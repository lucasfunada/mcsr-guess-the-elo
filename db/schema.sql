CREATE TABLE runs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    youtube_id VARCHAR(16) NOT NULL,
    mcsr_match_id INTEGER NOT NULL,
    player_name VARCHAR(32) NOT NULL,
    player_uuid UUID NOT NULL,
    player_elo INTEGER NOT NULL,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    split_nether INTEGER,
    split_bastion INTEGER,
    split_fortress INTEGER,
    split_blind INTEGER,
    split_eyespy INTEGER,
    split_end INTEGER
    video_offset SMALLINT NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'pending',
    CONSTRAINT runs_status_check
        CHECK (status IN ('pending', 'approved', 'rejected'))
);

CREATE TABLE challenges (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    run_id BIGINT NOT NULL UNIQUE REFERENCES runs(id),
    challenge_date DATE NOT NULL UNIQUE
);