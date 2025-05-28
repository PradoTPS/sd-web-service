import type { Player } from '../entities/player.entity';

export interface IPlayerRepository {
  findAll(): Promise<Player[]>;

  findById(id: string): Promise<Player | undefined>;

  create(player: Player): Promise<void>;

  update(player: Player): Promise<void>;
 
  delete(player: Player): Promise<void>;
}
