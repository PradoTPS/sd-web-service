import { BoardGame } from "../../../domain/entities/boardgame.entity";
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
      const boardGamesRows = this.db.prepare("SELECT * FROM lists_board_games WHERE list_id = ?").all(row.id);
      return new List({...row, boardGames: boardGamesRows.map((row: any) => new BoardGame(row))});
    });
  }

  async findById(id: string): Promise<List | undefined> {
    const row = this.db.prepare("SELECT * FROM lists WHERE id = ?").get(id);
    const boardGamesRows = this.db.prepare("SELECT * FROM lists_board_games WHERE list_id = ?").all(id);

    return row ? new List({...row, boardGames: boardGamesRows.map((row: any) => new BoardGame(row)) }) : undefined;
  }

  async findByPlayerId(playerId: string): Promise<List[]> {
    const rows = this.db.prepare("SELECT * FROM lists WHERE player_id = ?").all(playerId);
    
    return rows.map((row: any) => {
      const boardGamesRows = this.db.prepare("SELECT * FROM lists_board_games WHERE list_id = ?").all(row.id);
      return new List({...row, boardGames: boardGamesRows.map((row: any) => new BoardGame(row))});
    });
  }

  async create(list: List): Promise<void> {
    const { id, name, playerId, createdAt, updatedAt } = list.toJSON();
    this.db.prepare("INSERT INTO lists (id, name, player_id, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)").run(id, name, playerId, createdAt, updatedAt);
  }

  async update(list: List, { name }: { name: string | undefined }): Promise<List> {
    const {
      id,
      name: currentName,
    } = list.toJSON();

    this.db.prepare("UPDATE lists SET name = ?, updatedAt = ? WHERE id = ?").run(name ?? currentName, new Date().toISOString(), id);

    const row = this.db.prepare("SELECT * FROM lists WHERE id = ?").get(id);

    if (!row) throw new Error(`List with id ${id} not found, but was expected`);

    return new List(row);
  }

  async delete(list: List): Promise<void> {
    const { id } = list.toJSON();
    this.db.prepare("DELETE FROM lists WHERE id = ?").run(id);
  }
}