import { Player } from "../../domain/entities/player.entity";
import { UpdatePlayerUseCase } from "../useCases/updatePlayer.useCase";

export interface IResponse {
  body: {
    message: string;
    player: Player;
  };
  statusCode: number;
}

export interface IEvent {
  playerId: string;
  name?: string;
  email?: string;
}

export class UpdatePlayerController {
  constructor(private readonly updatePlayerUseCase: UpdatePlayerUseCase) {}

  async handle(event: IEvent): Promise<IResponse> {
    const { player } = await this.updatePlayerUseCase.execute({
      id: event.playerId,
      name: event.name,
      email: event.email,
    });

    return {
      statusCode: 200,
      body: {
        message: 'Player successfully updated!',
        player,
      },
    };
  }
}