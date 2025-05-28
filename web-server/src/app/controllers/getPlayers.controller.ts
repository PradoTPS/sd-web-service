import { Player } from "../../domain/entities/player.entity";
import { GetPlayersUseCase } from "../useCases/getPlayers.useCase";

export interface IResponse {
  body: {
    message: string;
    players: Player[];
  };
  statusCode: number;
}

export class GetPlayersController {
  constructor(private readonly getPlayersUseCase: GetPlayersUseCase) {}

  async handle(): Promise<IResponse> {
    const { players } = await this.getPlayersUseCase.execute();

    return {
      statusCode: 200,
      body: {
        message: 'Players successfully fetched!',
        players,
      },
    };
  }
}