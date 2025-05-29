import { Link } from "../../domain/types/link.type";
import { config } from "../../infrastructure/webserver/fastify/config";
import { GetBoardGamesUseCase } from "../useCases/getBoardGames.useCase";

export interface IResponse {
  body: {
    message: string;
    boardGames: Array<{
      id: string;
      name: string;
      description: string;
      link: string;
      createdAt: string;
      updatedAt: string;
      links: Link[];
    }>;
  };
  statusCode: number;
}

export class GetBoardGamesController {
  constructor(private readonly getBoardGamesUseCase: GetBoardGamesUseCase) {}

  async handle(): Promise<IResponse> {
    const { boardGames } = await this.getBoardGamesUseCase.execute();

    const parsedBoardGames = boardGames?.map((boardGame) => {
      return {
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
      }
    });

    return {
      statusCode: 200,
      body: {
        message: 'Board Games successfully fetched!',
        boardGames: parsedBoardGames,
      },
    };
  }
}