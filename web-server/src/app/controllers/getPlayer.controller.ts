import { Player } from "../../domain/entities/player.entity";
import { GetPlayerUseCase } from "../useCases/getPlayer.useCase";

export interface IResponse {
  body: {
    message: string;
    player: Player;
  };
  statusCode: number;
}

export interface IEvent {
  playerId: string;
}

export class GetPlayerController {
  constructor(private readonly getPlayerUseCase: GetPlayerUseCase) {}

  async handle(event: IEvent): Promise<IResponse> {
    const { player } = await this.getPlayerUseCase.execute({
      id: event.playerId,
    });

    return {
      statusCode: 200,
      body: {
        message: 'Player successfully fetched!',
        player,
      },
    };
  }
}