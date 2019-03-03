--
-- Table users
--
CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    UNIQUE(email)
);


--
-- Table reports
--
CREATE TABLE IF NOT EXISTS reports (
    title VARCHAR(60) NOT NULL,
    content TEXT NOT NULL,
    UNIQUE (title)
);


