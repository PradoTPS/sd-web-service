import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('./tmp/app.db');

// db.run("CREATE TABLE board_games (id TEXT PRIMARY KEY, name TEXT, description TEXT, link TEXT, createdAt TEXT, updatedAt TEXT)");
// db.run("INSERT INTO board_games (id, name, description, link, createdAt, updatedAt) VALUES ('qweuioq-qwrqwrq-qwrqwrq-qwrq', 'Chess', 'A classic strategy game', 'https://en.wikipedia.org/wiki/Chess', '2023-10-01T00:00:00Z', '2023-10-01T00:00:00Z')");

// db.run("CREATE TABLE players (id TEXT PRIMARY KEY, name TEXT, email TEXT, createdAt TEXT, updatedAt TEXT");
// db.run("CREATE TABLE lists (id TEXT PRIMARY KEY, name TEXT, player_id TEXT, createdAt TEXT, updatedAt TEXT");

export default db;