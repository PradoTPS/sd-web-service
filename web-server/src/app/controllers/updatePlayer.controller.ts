import { Link } from "../../domain/types/link.type";
import { config } from "../../infrastructure/webserver/fastify/config";
import { UpdatePlayerUseCase } from "../useCases/updatePlayer.useCase";

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
    }
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