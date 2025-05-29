import { BoardGame } from "../../../domain/entities/boardGame.entity";
import { List } from "../../../domain/entities/list.entity";
import { IListRepository } from "../../../domain/repositories/iList.repository";

export class SqliteListRepository implements IListRepository {
  readonly db: any;

  constructor(db: any) {
    this.db = db;
  }

  async findAll(): Promise<List[]> {
    const rows = this.db.prepare("SELECT * FROM lists").all();

    return rows.map((row: any) => {
      const boardGamesRows = this.db.prepare("SELECT bg.* FROM lists_board_games lbg inner join board_games bg on lbg.board_game_id = bg.id WHERE lbg.list_id = ?").all(row.id);
      return new List({...row, playerId: row.player_id, boardGames: boardGamesRows.map((row: any) => new BoardGame(row))});
    });
  }

  async findById(id: string): Promise<List | undefined> {
    const row = this.db.prepare("SELECT * FROM lists WHERE id = ?").get(id);
    const boardGamesRows = this.db.prepare("SELECT bg.* FROM lists_board_games lbg inner join board_games bg on lbg.board_game_id = bg.id WHERE lbg.list_id = ?").all(id);

    return row ? new List({...row, playerId: row.player_id, boardGames: boardGamesRows.map((row: any) => new BoardGame(row)) }) : undefined;
  }

  async findByPlayerId(playerId: string): Promise<List[]> {
    const rows = this.db.prepare("SELECT * FROM lists WHERE player_id = ?").all(playerId);
    
    return rows.map((row: any) => {
      const boardGamesRows = this.db.prepare("SELECT bg.* FROM lists_board_games lbg inner join board_games bg on lbg.board_game_id = bg.id WHERE lbg.list_id = ?").all(row.id);
      return new List({...row, playerId: row.player_id, boardGames: boardGamesRows.map((row: any) => new BoardGame(row))});
    });
  }

  async create(list: List): Promise<void> {
    const { id, name, playerId, createdAt, updatedAt } = list.toJSON();
    this.db.prepare("INSERT INTO lists (id, name, player_id, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)").run(id, name, playerId, createdAt, updatedAt);
  }

  async update(list: List, { name, boardGameIds }: { name: string | undefined, boardGameIds: string[] | undefined }): Promise<List> {
    const {
      id,
      name: currentName,
      boardGames: currentBoardGames,
    } = list.toJSON();

    this.db.prepare("UPDATE lists SET name = ?, updatedAt = ? WHERE id = ?").run(name ?? currentName, new Date().toISOString(), id);

    const currentBoardGamesIds = currentBoardGames?.map(({ id }) => id) ?? [];

    const boardGamesToAdd = boardGameIds?.filter(id => !currentBoardGamesIds.includes(id)) ?? [];
    const boardGamesToRemove = currentBoardGamesIds.filter(id => !boardGameIds?.includes(id)) ?? [];

    if (boardGamesToAdd.length) {
      const insertStmt = this.db.prepare("INSERT INTO lists_board_games (list_id, board_game_id, createdAt, updatedAt) VALUES (?, ?, ?, ?)");
      for (const boardGameId of boardGamesToAdd) {
        insertStmt.run(id, boardGameId, new Date().toISOString(), new Date().toISOString());
      }
    }

    if (boardGamesToRemove.length > 0) {
      const deleteStmt = this.db.prepare("DELETE FROM lists_board_games WHERE list_id = ? AND board_game_id = ?");
      for (const boardGameId of boardGamesToRemove) {
        deleteStmt.run(id, boardGameId);
      }
    }

    const row = this.db.prepare("SELECT * FROM lists WHERE id = ?").get(id);
    const boardGamesRows = this.db.prepare("SELECT bg.* FROM lists_board_games lbg inner join board_games bg on lbg.board_game_id = bg.id WHERE lbg.list_id = ?").all(id);

    if (!row) throw new Error(`List with id ${id} not found, but was expected`);

    return new List({...row, playerId: row.player_id, boardGames: boardGamesRows.map((row: any) => new BoardGame(row)) });
  }

  async delete(list: List): Promise<void> {
    const { id } = list.toJSON();
    this.db.prepare("DELETE FROM lists WHERE id = ?").run(id);
  }
}