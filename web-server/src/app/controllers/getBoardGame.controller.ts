import { Link } from "../../domain/types/link.type";
import { config } from "../../infrastructure/webserver/fastify/config";
import { GetBoardGameUseCase } from "../useCases/getBoardGame.useCase";

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
  boardGameId: string;
}

export class GetBoardGameController {
  constructor(private readonly getBoardGameUseCase: GetBoardGameUseCase) {}

  async handle(event: IEvent): Promise<IResponse> {
    const { boardGame } = await this.getBoardGameUseCase.execute({
      id: event.boardGameId,
    });

    return {
      statusCode: 200,
      body: {
        message: 'Board Game successfully fetched!',
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