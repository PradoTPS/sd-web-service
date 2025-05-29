import { Link } from "../../domain/types/link.type";
import { config } from "../../infrastructure/webserver/fastify/config";
import { CreateBoardGameUseCase } from "../useCases/createBoardGame.useCase";
export interface IResponse {
  body: {
    message: string;
    boardGame: {
      id: string;
      name: string;
      description: string;
      link: string;
      createdAt: string;
      updatedAt: string;
      _links: Link[];
    };
  };
  statusCode: number;
}

export interface IEvent {
  name: string;
  description: string;
  link: string;
}

export class CreateBoardGameController {
  constructor(private readonly createBoardGameUseCase: CreateBoardGameUseCase) {}

  async handle(event: IEvent): Promise<IResponse> {
    const { boardGame } = await this.createBoardGameUseCase.execute({
      name: event.name,
      description: event.description,
      link: event.link,
    });

    return {
      statusCode: 200,
      body: {
        message: 'Board Game successfully created!',
        boardGame: {
          ...boardGame.toJSON(),
          _links: [
            {
              href: `http://${config.app.domain}:${config.app.port}/boardgames/${boardGame.id}`,
              rel: 'self',
              type: 'GET',
            },
            {
              href: `http://${config.app.domain}:${config.app.port}/boardgames/${boardGame.id}`,
              rel: 'update',
              type: 'PUT',
            },
            {
              href: `http://${config.app.domain}:${config.app.port}/boardgames/${boardGame.id}`,
              rel: 'delete',
              type: 'DELETE',
            }
          ]
        },
      },
    };
  }
}