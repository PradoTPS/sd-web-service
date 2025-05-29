import { BoardGame } from "../../domain/entities/boardGame.entity";
import { GetBoardGameUseCase } from "../useCases/getBoardGame.useCase";

export interface IResponse {
  body: {
    message: string;
    boardGame: BoardGame;
  };
  statusCode: number;
}

export interface IEvent {
  boardGameId: string;
}

export class GetBoardGameController {
  constructor(private readonly getBoardGameUseCase: GetBoardGameUseCase) {}

  async handle(event: IEvent): Promise<IResponse> {
    const { boardGame } = await this.getBoardGameUseCase.execute({
      id: event.boardGameId,
    });

    return {
      statusCode: 200,
      body: {
        message: 'Board Game successfully fetched!',
        boardGame,
      },
    };
  }
}