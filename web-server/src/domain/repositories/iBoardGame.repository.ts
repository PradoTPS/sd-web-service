import type { BoardGame } from '../entities/boardGame.entity';

export interface IBoardGameRepository {
  findAll(): Promise<BoardGame[]>;

  findById(id: string): Promise<BoardGame | undefined>;

  create(boardGame: BoardGame): Promise<void>;

  update(boardGame: BoardGame, { name, description, link }: { name: string | undefined, description: string | undefined, link: string | undefined }): Promise<BoardGame>;
 
  delete(boardGame: BoardGame): Promise<void>;
}
