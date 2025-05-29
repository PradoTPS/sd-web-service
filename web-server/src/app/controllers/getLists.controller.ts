import { List } from "../../domain/entities/list.entity";
import { Link } from "../../domain/types/link.type";
import { config } from "../../infrastructure/webserver/fastify/config";
import { GetListsUseCase } from "../useCases/getLists.useCase";

export interface IResponse {
  body: {
    message: string;
    lists: Array<{
      id: string;
      name: string;
      playerId: string;
      createdAt: string;
      updatedAt: string;
      links: Link[];
    }>;
  };
  statusCode: number;
}

export interface IEvent {
  playerId: string;
}

export class GetListsController {
  constructor(private readonly getListsUseCase: GetListsUseCase) {}

  async handle(event: IEvent): Promise<IResponse> {
    const { lists } = await this.getListsUseCase.execute({
      playerId: event.playerId,
    });

    const parsedLists = lists?.map((list) => {
      return {
        ...list.toJSON(),
        links: [
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
      }
    });

    return {
      statusCode: 200,
      body: {
        message: `Lists of Player ${event.playerId} successfully fetched!`,
        lists: parsedLists,
      },
    };
  }
}