import { BoardGame } from "../../domain/entities/boardgame.entity";
import { IBoardGameRepository } from "../../domain/repositories/iBoardGame.repository";
import { ICreateBoardGameDTOInput, ICreateBoardGameDTOOutput } from "../dto/createBoardGame.dto";

export class CreateBoardGameUseCase {
  constructor(private readonly boardGameRepository: IBoardGameRepository) {}

  async execute(data: ICreateBoardGameDTOInput): Promise<ICreateBoardGameDTOOutput> {

    const boardGame = new BoardGame({
      name: data.name,
      description: data.description,
      link: data.link,
    });
    
    await this.boardGameRepository.create(boardGame);

    return {
      boardGame,
    };
  }
}
