import { DeleteBoardGameUseCase } from "../useCases/deleteBoardGame.useCase";

export interface IResponse {
  body: {
    message: string;
  };
  statusCode: number;
}

export interface IEvent {
  boardGameId: string;
}

export class DeleteBoardGameController {
  constructor(private readonly deleteBoardGameUseCase: DeleteBoardGameUseCase) {}

  async handle(event: IEvent): Promise<IResponse> {
    await this.deleteBoardGameUseCase.execute({
      id: event.boardGameId
    });

    return {
      statusCode: 200,
      body: {
        message: 'Board Game successfully deleted!'
      },
    };
  }
}