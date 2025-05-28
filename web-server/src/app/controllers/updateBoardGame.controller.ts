import { BoardGame } from "../../domain/entities/boardgame.entity";
import { UpdateBoardGameUseCase } from "../useCases/updateBoardGame.useCase";

export interface IResponse {
  body: {
    message: string;
    boardGame: BoardGame;
  };
  statusCode: number;
}

export interface IEvent {
  boardGameId: string;
  name?: string;
  description?: string;
  link?: string;
}

export class UpdateBoardGameController {
  constructor(private readonly updateBoardGameUseCase: UpdateBoardGameUseCase) {}

  async handle(event: IEvent): Promise<IResponse> {
    const { boardGame } = await this.updateBoardGameUseCase.execute({
      id: event.boardGameId,
      name: event.name,
      description: event.description,
      link: event.link,
    });

    return {
      statusCode: 200,
      body: {
        message: 'Board Game successfully updated!',
        boardGame,
      },
    };
  }
}