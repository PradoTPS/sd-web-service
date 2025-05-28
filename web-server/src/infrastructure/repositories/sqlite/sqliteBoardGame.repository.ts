import { BoardGame } from "../../../domain/entities/boardgame.entity";
import { IBoardGameRepository } from "../../../domain/repositories/iBoardGame.repository";

export class SqliteBoardGameRepository implements IBoardGameRepository {
  readonly db: any;

  constructor(db: any) {
    this.db = db;
  }

  async findAll(): Promise<BoardGame[]> {
    const rows = await this.db.all("SELECT * FROM board_games");
    return rows.map((row: any) => new BoardGame(row));
  }

  async findById(id: string): Promise<BoardGame | undefined> {
    const row = await this.db.get("SELECT * FROM board_games WHERE id = ?", [id]);
    return row ? new BoardGame(row) : undefined;
  }

  async create(boardGame: BoardGame): Promise<void> {
    const { id, name, description, link, createdAt, updatedAt } = boardGame.toJSON();
    await this.db.run("INSERT INTO board_games (id, name, description, link, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)", [id, name, description, link, createdAt, updatedAt]);
  }

  async update(boardGame: BoardGame): Promise<void> {
    const { id, name, description } = boardGame.toJSON();
    await this.db.run("UPDATE board_games SET name = ?, description = ? WHERE id = ?", [name, description, id]);
  }

  async delete(boardGame: BoardGame): Promise<void> {
    const { id } = boardGame.toJSON();
    await this.db.run("DELETE FROM board_games WHERE id = ?", [id]);
  }
}