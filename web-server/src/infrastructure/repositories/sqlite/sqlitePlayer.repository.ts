import { List } from "../../../domain/entities/list.entity";
import { Player } from "../../../domain/entities/player.entity";
import { IPlayerRepository } from "../../../domain/repositories/iPlayer.repository";

export class SqlitePlayerRepository implements IPlayerRepository {
  readonly db: any;

  constructor(db: any) {
    this.db = db;
  }

  async findAll(): Promise<Player[]> {
    const rows = this.db.prepare("SELECT * FROM players").all();

    return rows.map((row: any) => {
      const listRows = this.db.prepare("SELECT * FROM lists WHERE player_id = ?").all(row.id);
      return new Player({...row, lists: listRows.map((row: any) => new List(row))});
    });
  }

  async findById(id: string): Promise<Player | undefined> {
    const row = this.db.prepare("SELECT * FROM players WHERE id = ?").get(id);
    const listRows = this.db.prepare("SELECT * FROM lists WHERE player_id = ?").all(id);

    return row ? new Player({...row, lists: listRows.map((row: any) => new List(row)) }) : undefined;
  }

  async create(player: Player): Promise<void> {
    const { id, name, email, createdAt, updatedAt } = player.toJSON();

    this.db.prepare("INSERT INTO players (id, name, email, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)").run(id, name, email, createdAt, updatedAt);
  }

  async update(player: Player, { name, email }: { name: string | undefined, email: string | undefined }): Promise<Player> {
    const {
      id,
      name: currentName,
      email: currentEmail,
    } = player.toJSON();

    this.db.prepare("UPDATE players SET name = ?, email = ?, updatedAt = ? WHERE id = ?").run(name ?? currentName, email ?? currentEmail, new Date().toISOString(), id);

    const row = this.db.prepare("SELECT * FROM players WHERE id = ?").get(id);

    if (!row) throw new Error(`Player with id ${id} not found, but was expected`);

    return new Player(row);
  }

  async delete(player: Player): Promise<void> {
    const { id } = player.toJSON();
    this.db.prepare("DELETE FROM players WHERE id = ?").run(id);
  }
}