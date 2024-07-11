-- For creating tables:

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE betting_slips (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    amount DECIMAL NOT NULL,
    winning_team_id INT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- For sample data insertion:

INSERT INTO users (username, password) VALUES ('Punisher', 'hashed_password_here');
INSERT INTO users (username, password) VALUES ('Jonathan', 'hashed_password_here');

-- Assume 'hashed_password_here' is a placeholder; you should insert actual hashed passwords

INSERT INTO betting_slips (user_id, event_id, amount, winning_team_id) VALUES (1, 101, 50, 500);
INSERT INTO betting_slips (user_id, event_id, amount, winning_team_id) VALUES (2, 102, 75, 501);
