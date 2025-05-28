import type { List } from '../entities/list.entity';

export interface IListRepository {
  findAll(): Promise<List[]>;

  findById(id: string): Promise<List | undefined>;

  findByPlayerId(
    playerId: string,
  ): Promise<{ count: number; lists: List[] }>;

  create(list: List): Promise<void>;

  update(list: List): Promise<void>;
 
  delete(list: List): Promise<void>;
}
