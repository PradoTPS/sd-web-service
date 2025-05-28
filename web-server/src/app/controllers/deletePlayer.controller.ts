import { DeletePlayerUseCase } from "../useCases/deletePlayer.useCase";

export interface IResponse {
  body: {
    message: string;
  };
  statusCode: number;
}

export interface IEvent {
  playerId: string;
}

export class DeletePlayerController {
  constructor(private readonly deletePlayerUseCase: DeletePlayerUseCase) {}

  async handle(event: IEvent): Promise<IResponse> {
    await this.deletePlayerUseCase.execute({
      id: event.playerId
    });

    return {
      statusCode: 200,
      body: {
        message: 'Player successfully deleted!'
      },
    };
  }
}