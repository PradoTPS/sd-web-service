import { Link } from "../../domain/types/link.type";
import { config } from "../../infrastructure/webserver/fastify/config";
import { UpdateListUseCase } from "../useCases/updateList.useCase";

export interface IResponse {
  body: {
    message: string;
    list: {
      id: string;
      name: string;
      playerId: string;
      createdAt: string;
      updatedAt: string;
      links: Link[];
    };
  };
  statusCode: number;
}

export interface IEvent {
  listId: string;
  name?: string;
  boardGames?: string[];
}

export class UpdateListController {
  constructor(private readonly updateListUseCase: UpdateListUseCase) {}

  async handle(event: IEvent): Promise<IResponse> {
    const { list } = await this.updateListUseCase.execute({
      id: event.listId,
      name: event.name,
      boardGameIds: event.boardGames,
    });

    return {
      statusCode: 200,
      body: {
        message: 'List successfully updated!',
        list: {
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
        },
      },
    };
  }
}