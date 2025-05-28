import { NotFound } from 'http-errors';
import { IBoardGameRepository } from "../../domain/repositories/iBoardGame.repository";
import { IGetBoardGameDTOInput, IGetBoardGameDTOOutput } from "../dto/getBoardGame.dto";

export class GetBoardGameUseCase {
  constructor(private readonly boardGameRepository: IBoardGameRepository) {}

  async execute(data: IGetBoardGameDTOInput): Promise<IGetBoardGameDTOOutput> {
    const boardGame = await this.boardGameRepository.findById(data.id);

    if (!boardGame) throw new NotFound(`Board game with id ${data.id} not found`);

    return {
      boardGame,
    };
  }
}
