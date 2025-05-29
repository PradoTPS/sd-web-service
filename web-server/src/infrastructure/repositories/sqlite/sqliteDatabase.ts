import Database from 'better-sqlite3'

const db = new Database('./tmp/app.db');

// // Create tables
// db.prepare("CREATE TABLE board_games (id TEXT PRIMARY KEY, name TEXT, description TEXT, link TEXT, createdAt TEXT, updatedAt TEXT)").run();
// db.prepare("CREATE TABLE players (id TEXT PRIMARY KEY, name TEXT, email TEXT, createdAt TEXT, updatedAt TEXT)").run();
// db.prepare("CREATE TABLE lists (id TEXT PRIMARY KEY, name TEXT, player_id TEXT REFERENCES players(id) ON UPDATE CASCADE ON DELETE CASCADE, createdAt TEXT, updatedAt TEXT)").run();
// db.prepare("CREATE TABLE lists_board_games (list_id TEXT REFERENCES lists(id) ON UPDATE CASCADE ON DELETE CASCADE, board_game_id TEXT REFERENCES board_games(id) ON UPDATE CASCADE ON DELETE CASCADE, createdAt TEXT, updatedAt TEXT, PRIMARY KEY (list_id, board_game_id))").run();

// // Seed
// let stmtInsertBoardGames = db.prepare("INSERT INTO board_games (id, name, description, link, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)");
// stmtInsertBoardGames.run('76dfa10c-804a-458f-a085-db195886d1b4', 'Xadrez', 'Jogo de xadrez', 'https://en.wikipedia.org/wiki/Chess', '2025-05-28T18:58:49.915Z', '2025-05-28T18:58:49.915Z');
// stmtInsertBoardGames.run('5e9a4bf3-20c2-4d9d-8624-85115610830c', 'Damas', 'Jogo de damas', 'https://en.wikipedia.org/wiki/Checkers', '2025-05-28T18:58:49.915Z', '2025-05-28T18:58:49.915Z');

// let stmtInsertPlayers = db.prepare("INSERT INTO players (id, name, email, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)");
// stmtInsertPlayers.run('f2b369fc-0436-4bf7-88b6-6c0d9775fb64', 'Alice', 'alice@mail.com', '2025-05-28T18:58:49.915Z', '2025-05-28T18:58:49.915Z');
// stmtInsertPlayers.run('662c1bd7-50f7-44bf-ba6e-db3418431a09', 'Bob', 'bob@mail.com', '2025-05-28T18:58:49.915Z', '2025-05-28T18:58:49.915Z');

// let stmtInsertLists = db.prepare("INSERT INTO lists (id, name, player_id, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)");
// stmtInsertLists.run('20a08c83-17c4-4b4e-b773-4673563c8cc4', 'Lista de desejos', 'f2b369fc-0436-4bf7-88b6-6c0d9775fb64', '2025-05-28T18:58:49.915Z', '2025-05-28T18:58:49.915Z');
// stmtInsertLists.run('79d09a95-2ac9-4452-afe7-f3707f0b42d2', 'Jogatina de segunda', 'f2b369fc-0436-4bf7-88b6-6c0d9775fb64', '2025-05-28T18:58:49.915Z', '2025-05-28T18:58:49.915Z');
// stmtInsertLists.run('75616e48-10a9-49bf-aa80-e348a2305d14', 'Presentes', '662c1bd7-50f7-44bf-ba6e-db3418431a09', '2025-05-28T18:58:49.915Z', '2025-05-28T18:58:49.915Z');

// let stmtInsertListsBoardGames = db.prepare("INSERT INTO lists_board_games (list_id, board_game_id, createdAt, updatedAt) VALUES (?, ?, ?, ?)");
// stmtInsertListsBoardGames.run('20a08c83-17c4-4b4e-b773-4673563c8cc4', '76dfa10c-804a-458f-a085-db195886d1b4', '2025-05-28T18:58:49.915Z', '2025-05-28T18:58:49.915Z');
// stmtInsertListsBoardGames.run('79d09a95-2ac9-4452-afe7-f3707f0b42d2', '76dfa10c-804a-458f-a085-db195886d1b4', '2025-05-28T18:58:49.915Z', '2025-05-28T18:58:49.915Z');
// stmtInsertListsBoardGames.run('20a08c83-17c4-4b4e-b773-4673563c8cc4', '5e9a4bf3-20c2-4d9d-8624-85115610830c', '2025-05-28T18:58:49.915Z', '2025-05-28T18:58:49.915Z');
// stmtInsertListsBoardGames.run('75616e48-10a9-49bf-aa80-e348a2305d14', '5e9a4bf3-20c2-4d9d-8624-85115610830c', '2025-05-28T18:58:49.915Z', '2025-05-28T18:58:49.915Z');

export default db;