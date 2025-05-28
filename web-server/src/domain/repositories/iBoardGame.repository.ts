import type { BoardGame } from '../entities/boardgame.entity';

export interface IBoardGameRepository {
  findAll(): Promise<BoardGame[]>;

  findById(id: string): Promise<BoardGame | undefined>;

  create(boardGame: BoardGame): Promise<void>;

  update(boardGame: BoardGame): Promise<void>;
 
  delete(boardGame: BoardGame): Promise<void>;
}
