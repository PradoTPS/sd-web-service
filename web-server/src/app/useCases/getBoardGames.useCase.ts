import { IBoardGameRepository } from "../../domain/repositories/iBoardGame.repository";
import { IGetBoardGamesDTOOutput } from "../dto/getBoardGames.dto";

export class GetBoardGamesUseCase {
  constructor(private readonly boardGameRepository: IBoardGameRepository) {}

  async execute(): Promise<IGetBoardGamesDTOOutput> {
    const boardGames = await this.boardGameRepository.findAll();

    return {
      boardGames,
    };
  }
}
