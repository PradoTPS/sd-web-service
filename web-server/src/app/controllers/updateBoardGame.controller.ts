import { Link } from "../../domain/types/link.type";
import { config } from "../../infrastructure/webserver/fastify/config";
import { UpdateBoardGameUseCase } from "../useCases/updateBoardGame.useCase";

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
      links: Link[];
    };
  };
  statusCode: number;
}

export interface IEvent {
  boardGameId: string;
  name?: string;
  description?: string;
  link?: string;
}

export class UpdateBoardGameController {
  constructor(private readonly updateBoardGameUseCase: UpdateBoardGameUseCase) {}

  async handle(event: IEvent): Promise<IResponse> {
    const { boardGame } = await this.updateBoardGameUseCase.execute({
      id: event.boardGameId,
      name: event.name,
      description: event.description,
      link: event.link,
    });

    return {
      statusCode: 200,
      body: {
        message: 'Board Game successfully updated!',
        boardGame: {
          ...boardGame.toJSON(),
          links: [
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