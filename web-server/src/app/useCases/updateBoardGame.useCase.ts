import { NotFound } from 'http-errors';
import { IBoardGameRepository } from "../../domain/repositories/iBoardGame.repository";
import { IUpdateBoardGameDTOInput, IUpdateBoardGameDTOOutput } from "../dto/updateBoardGame.dto";

export class UpdateBoardGameUseCase {
  constructor(private readonly boardGameRepository: IBoardGameRepository) {}

  async execute(data: IUpdateBoardGameDTOInput): Promise<IUpdateBoardGameDTOOutput> {
    let boardGame = await this.boardGameRepository.findById(data.id);

    if (!boardGame) throw new NotFound(`Board game with id ${data.id} not found`);

    boardGame = await this.boardGameRepository.update(boardGame, {
      name: data.name,
      description: data.description,
      link: data.link,
    });

    return {
      boardGame,
    }
  }
}
