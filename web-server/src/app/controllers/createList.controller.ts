import { Link } from "../../domain/types/link.type";
import { config } from "../../infrastructure/webserver/fastify/config";
import { CreateListUseCase } from "../useCases/createList.useCase";

export interface IResponse {
  body: {
    message: string;
    list: {
      id: string;
      name: string;
      playerId: string;
      createdAt: string;
      updatedAt: string;
      _links: Link[];
    };
  };
  statusCode: number;
}

export interface IEvent {
  name: string;
  playerId: string;
}

export class CreateListController {
  constructor(private readonly createListUseCase: CreateListUseCase) {}

  async handle(event: IEvent): Promise<IResponse> {
    const { list } = await this.createListUseCase.execute({
      name: event.name,
      playerId: event.playerId,
    });

    return {
      statusCode: 200,
      body: {
        message: 'List successfully created!',
        list: {
          ...list.toJSON(),
          _links: [
            {
              href: `http://${config.app.domain}:${config.app.port}/players/${list.playerId}/lists/${list.id}`,
              rel: 'self',
              type: 'GET',
            },
            {
              href: `http://${config.app.domain}:${config.app.port}/players/${list.playerId}/lists/${list.id}`,
              rel: 'update',
              type: 'PUT',
            },
            {
              href: `http://${config.app.domain}:${config.app.port}/players/${list.playerId}/lists/${list.id}`,
              rel: 'delete',
              type: 'DELETE',
            }
          ]
        },
      },
    };
  }
}