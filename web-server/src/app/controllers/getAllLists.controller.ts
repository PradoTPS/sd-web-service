import { Link } from "../../domain/types/link.type";
import { config } from "../../infrastructure/webserver/fastify/config";
import { GetAllListsUseCase } from "../useCases/getAllLists.useCase";

export interface IResponse {
  body: {
    message: string;
    lists: Array<{
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
      _links: Link[];
    }>;
  };
  statusCode: number;
}

export class GetAllListsController {
  constructor(private readonly getAllListsUseCase: GetAllListsUseCase) {}

  async handle(): Promise<IResponse> {
    const { lists } = await this.getAllListsUseCase.execute();

    const parsedLists = lists?.map((list) => {
      return {
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
      }
    });

    return {
      statusCode: 200,
      body: {
        message: 'Lists successfully fetched!',
        lists: parsedLists,
      },
    };
  }
}