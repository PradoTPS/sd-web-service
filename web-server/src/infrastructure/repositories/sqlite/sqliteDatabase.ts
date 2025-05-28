import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('./tmp/app.db');

// Create tables
// db.run("CREATE TABLE board_games (id TEXT PRIMARY KEY, name TEXT, description TEXT, link TEXT, createdAt TEXT, updatedAt TEXT)");
// db.run("CREATE TABLE players (id TEXT PRIMARY KEY, name TEXT, email TEXT, createdAt TEXT, updatedAt TEXT)");
// db.run("CREATE TABLE lists (id TEXT PRIMARY KEY, name TEXT, player_id TEXT REFERENCES players(id) ON UPDATE CASCADE, createdAt TEXT, updatedAt TEXT)");

// Seed
// db.run("INSERT INTO board_games (id, name, description, link, createdAt, updatedAt) VALUES ('76dfa10c-804a-458f-a085-db195886d1b4', 'Xadrez', 'Jogo de xadrez', 'https://en.wikipedia.org/wiki/Chess', '1748450167625.0', '1748450167625.0')");
// db.run("INSERT INTO board_games (id, name, description, link, createdAt, updatedAt) VALUES ('5e9a4bf3-20c2-4d9d-8624-85115610830c', 'Damas', 'Jogo de damas', 'https://en.wikipedia.org/wiki/Checkers', '1748450167625.0', '1748450167625.0')");

// db.run("INSERT INTO players (id, name, email, createdAt, updatedAt) VALUES ('f2b369fc-0436-4bf7-88b6-6c0d9775fb64', 'Alice', 'alice@mail.com', '1748450167625.0', '1748450167625.0')");
// // db.run("INSERT INTO players (id, name, email, createdAt, updatedAt) VALUES ('662c1bd7-50f7-44bf-ba6e-db3418431a09', 'Bob', 'bob@mail.com', '1748450167625.0', '1748450167625.0')");

// db.run("INSERT INTO lists (id, name, player_id, createdAt, updatedAt) VALUES ('20a08c83-17c4-4b4e-b773-4673563c8cc4', 'Lista de desejos', 'f2b369fc-0436-4bf7-88b6-6c0d9775fb64', '1748450167625.0', '1748450167625.0')");
// db.run("INSERT INTO lists (id, name, player_id, createdAt, updatedAt) VALUES ('79d09a95-2ac9-4452-afe7-f3707f0b42d2', 'Jogatina de segunda', 'f2b369fc-0436-4bf7-88b6-6c0d9775fb64', '1748450167625.0', '1748450167625.0')");
// db.run("INSERT INTO lists (id, name, player_id, createdAt, updatedAt) VALUES ('75616e48-10a9-49bf-aa80-e348a2305d14', 'Presentes', '662c1bd7-50f7-44bf-ba6e-db3418431a09', '1748450167625.0', '1748450167625.0')");

export default db;