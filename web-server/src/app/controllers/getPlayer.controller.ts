import { Link } from "../../domain/types/link.type";
import { config } from "../../infrastructure/webserver/fastify/config";
import { GetPlayerUseCase } from "../useCases/getPlayer.useCase";

export interface IResponse {
  body: {
    message: string;
    player: {
      id: string;
      name: string;
      email: string;
      createdAt: string;
      updatedAt: string;
      _links: Link[];
    };
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
        player: {
          ...player.toJSON(),
          _links: [
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
        },
      },
    };
  }
}