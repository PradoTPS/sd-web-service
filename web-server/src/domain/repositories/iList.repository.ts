import type { List } from '../entities/list.entity';

export interface IListRepository {
  findAll(): Promise<List[]>;

  findById(id: string): Promise<List | undefined>;

  findByPlayerId(
    playerId: string,
  ): Promise<List[]>;

  create(list: List): Promise<void>;

  update(list: List, { name, boardGameIds }: { name: string | undefined, boardGameIds: string[] | undefined }): Promise<List>;
 
  delete(list: List): Promise<void>;
}
