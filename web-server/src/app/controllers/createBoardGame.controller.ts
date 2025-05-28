import { BoardGame } from "../../domain/entities/boardgame.entity";
import { CreateBoardGameUseCase } from "../useCases/createBoardGame.useCase";

export interface IResponse {
  body: {
    message: string;
    boardGame: BoardGame;
  };
  statusCode: number;
}

export interface IEvent {
  name: string;
  description: string;
  link: string;
}

export class CreateBoardGameController {
  constructor(private readonly createBoardGameUseCase: CreateBoardGameUseCase) {}

  async handle(event: IEvent): Promise<IResponse> {
    const { boardGame } = await this.createBoardGameUseCase.execute({
      name: event.name,
      description: event.description,
      link: event.link,
    });

    return {
      statusCode: 200,
      body: {
        message: 'Board Game successfully created!',
        boardGame,
      },
    };
  }
}