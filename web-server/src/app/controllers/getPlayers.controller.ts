import { Player } from "../../domain/entities/player.entity";
import { Link } from "../../domain/types/link.type";
import { config } from "../../infrastructure/webserver/fastify/config";
import { GetPlayersUseCase } from "../useCases/getPlayers.useCase";

export interface IResponse {
  body: {
    message: string;
    players: Array<{
      id: string;
      name: string;
      email: string;
      createdAt: string;
      updatedAt: string;
      links: Link[];
    }>;
  };
  statusCode: number;
}

export class GetPlayersController {
  constructor(private readonly getPlayersUseCase: GetPlayersUseCase) {}

  async handle(): Promise<IResponse> {
    const { players } = await this.getPlayersUseCase.execute();

    const parsedPlayers = players?.map((player) => {
      return {
        ...player.toJSON(),
        links: [
          {
            href: `http://${config.app.domain}:${config.app.port}/players/${player.id}`,
            rel: 'self',
            type: 'GET',
          },
          {
            href: `http://${config.app.domain}:${config.app.port}/players/${player.id}`,
            rel: 'update',
            type: 'PUT',
          },
          {
            href: `http://${config.app.domain}:${config.app.port}/players/${player.id}`,
            rel: 'delete',
            type: 'DELETE',
          }
        ]
      }
    });

    return {
      statusCode: 200,
      body: {
        message: 'Players successfully fetched!',
        players: parsedPlayers,
      },
    };
  }
}