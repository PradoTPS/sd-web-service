import type { Player } from '../entities/player.entity';

export interface IPlayerRepository {
  findAll(): Promise<Player[]>;

  findById(id: string): Promise<Player | undefined>;

  create(player: Player): Promise<void>;

  update(player: Player, { name, email }: { name: string | undefined, email: string | undefined }): Promise<Player>;
 
  delete(player: Player): Promise<void>;
}
