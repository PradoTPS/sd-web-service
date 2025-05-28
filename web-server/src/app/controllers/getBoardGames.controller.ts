import { BoardGame } from "../../domain/entities/boardgame.entity";
import { GetBoardGamesUseCase } from "../useCases/getBoardGames.useCase";

export interface IResponse {
  body: {
    message: string;
    boardGames: BoardGame[];
  };
  statusCode: number;
}

export class GetBoardGamesController {
  constructor(private readonly getBoardGamesUseCase: GetBoardGamesUseCase) {}

  async handle(): Promise<IResponse> {
    const { boardGames } = await this.getBoardGamesUseCase.execute();

    return {
      statusCode: 200,
      body: {
        message: 'Board Games successfully fetched!',
        boardGames,
      },
    };
  }
}