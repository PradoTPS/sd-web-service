import { Link } from "../../domain/types/link.type";
import { config } from "../../infrastructure/webserver/fastify/config";
import { GetListUseCase } from "../useCases/getList.useCase";

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
}

export class GetListController {
  constructor(private readonly getListUseCase: GetListUseCase) {}

  async handle(event: IEvent): Promise<IResponse> {
    const { list } = await this.getListUseCase.execute({
      id: event.listId,
    });

    return {
      statusCode: 200,
      body: {
        message: 'List successfully fetched!',
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