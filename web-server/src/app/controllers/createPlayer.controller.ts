import { Player } from "../../domain/entities/player.entity";
import { CreatePlayerUseCase } from "../useCases/createPlayer.useCase";

export interface IResponse {
  body: {
    message: string;
    player: Player;
  };
  statusCode: number;
}

export interface IEvent {
  name: string;
  email: string;
}

export class CreatePlayerController {
  constructor(private readonly createPlayerUseCase: CreatePlayerUseCase) {}

  async handle(event: IEvent): Promise<IResponse> {
    const { player } = await this.createPlayerUseCase.execute({
      name: event.name,
      email: event.email,
    });

    return {
      statusCode: 200,
      body: {
        message: 'Player successfully created!',
        player,
      },
    };
  }
}