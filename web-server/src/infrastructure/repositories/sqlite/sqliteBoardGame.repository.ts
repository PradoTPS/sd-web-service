import { BoardGame } from "../../../domain/entities/boardGame.entity";
import { IBoardGameRepository } from "../../../domain/repositories/iBoardGame.repository";

export class SqliteBoardGameRepository implements IBoardGameRepository {
  readonly db: any;

  constructor(db: any) {
    this.db = db;
  }

  async findAll(): Promise<BoardGame[]> {
    const rows =  this.db.prepare("SELECT * FROM board_games").all();
    return rows.map((row: any) => new BoardGame(row));
  }

  async findById(id: string): Promise<BoardGame | undefined> {
    const row = this.db.prepare("SELECT * FROM board_games WHERE id = ?").get(id);
    return row ? new BoardGame(row) : undefined;
  }

  async create(boardGame: BoardGame): Promise<void> {
    const { id, name, description, link, createdAt, updatedAt } = boardGame.toJSON();
    this.db.prepare("INSERT INTO board_games (id, name, description, link, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)").run(id, name, description, link, createdAt, updatedAt);
  }

  async update(boardGame: BoardGame, { name, description, link }: { name: string | undefined, description: string | undefined, link: string | undefined }): Promise<BoardGame> {
    const {
      id,
      name: currentName,
      description: currentDescription,
      link: currentLink
    } = boardGame.toJSON();

    this.db.prepare("UPDATE board_games SET name = ?, description = ?, link = ?, updatedAt = ? WHERE id = ?").run(name ?? currentName, description ?? currentDescription, link ?? currentLink, new Date().toISOString(), id);

    const row = this.db.prepare("SELECT * FROM board_games WHERE id = ?").get(id);

    if (!row) throw new Error(`Board game with id ${id} not found, but was expected`);

    return new BoardGame(row);
  }

  async delete(boardGame: BoardGame): Promise<void> {
    const { id } = boardGame.toJSON();
    this.db.prepare("DELETE FROM board_games WHERE id = ?").run(id);
  }
}