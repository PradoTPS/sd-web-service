import { Link } from "../../domain/types/link.type";
import { config } from "../../infrastructure/webserver/fastify/config";
import { CreatePlayerUseCase } from "../useCases/createPlayer.useCase";

export interface IResponse {
  body: {
    message: string;
    player: {
      id: string;
      name: string;
      email: string;
      createdAt: string;
      updatedAt: string;
      links: Link[];
    }
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
        player: {
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
        },
      },
    };
  }
}