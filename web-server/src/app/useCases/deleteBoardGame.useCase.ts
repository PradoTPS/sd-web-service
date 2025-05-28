import { IBoardGameRepository } from "../../domain/repositories/iBoardGame.repository";
import { IDeleteBoardGameDTOInput } from "../dto/deleteBoardGame.dto";

export class DeleteBoardGameUseCase {
  constructor(private readonly boardGameRepository: IBoardGameRepository) {}

  async execute(data: IDeleteBoardGameDTOInput): Promise<void> {
    const boardGame = await this.boardGameRepository.findById(data.id);

    if (boardGame) await this.boardGameRepository.delete(boardGame);
  }
}
