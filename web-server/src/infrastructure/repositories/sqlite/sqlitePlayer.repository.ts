import { Player } from "../../../domain/entities/player.entity";
import { IPlayerRepository } from "../../../domain/repositories/iPlayer.repository";

export class SqlitePlayerRepository implements IPlayerRepository {
  readonly db: any;

  constructor(db: any) {
    this.db = db;
  }

  async findAll(): Promise<Player[]> {
    const stmt = this.db.prepare("SELECT * FROM players");
    const rows =  stmt.all();
    return rows.map((row: any) => new Player(row));
  }

  async findById(id: string): Promise<Player | undefined> {
    const stmt = this.db.prepare("SELECT * FROM players WHERE id = ?");
    const row = stmt.get(id);
    return row ? new Player(row) : undefined;
  }

  async create(player: Player): Promise<void> {
    const { id, name, email, createdAt, updatedAt } = player.toJSON();
    const stmt = this.db.prepare("INSERT INTO players (id, name, email, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)");
    stmt.run(id, name, email, createdAt, updatedAt);
  }

  async update(player: Player, { name, email }: { name: string | undefined, email: string | undefined }): Promise<Player> {
    const {
      id,
      name: currentName,
      email: currentEmail,
    } = player.toJSON();

    let stmt = this.db.prepare("UPDATE players SET name = ?, email = ?, updatedAt = ? WHERE id = ?");
    stmt.run(name ?? currentName, email ?? currentEmail, new Date().toISOString(), id);

    stmt = this.db.prepare("SELECT * FROM players WHERE id = ?");
    const row = stmt.get(id);

    if (!row) throw new Error(`Player with id ${id} not found, but was expected`);

    return new Player(row);
  }

  async delete(player: Player): Promise<void> {
    const { id } = player.toJSON();
    const stmt = this.db.prepare("DELETE FROM players WHERE id = ?");
    stmt.run(id);
  }
}