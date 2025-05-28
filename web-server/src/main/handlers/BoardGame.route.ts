import { FastifyInstance } from 'fastify'
import { GetBoardGamesController } from '../../app/controllers/getBoardGames.controller'
import { GetBoardGamesUseCase } from '../../app/useCases/getBoarGames.useCase'
import { SqliteBoardGameRepository } from '../../infrastructure/repositories/sqlite/sqliteBoardGame.repository'
import db from '../../infrastructure/repositories/sqlite/sqliteDatabase'
import { CreateBoardGameUseCase } from '../../app/useCases/createBoardGame.useCase'
import { CreateBoardGameController } from '../../app/controllers/createBoardGame.controller'

class BoardGameRoutes {
  public prefix_route = '/boardgames'

  async routes(fastify: FastifyInstance) {

    fastify.get(`/`, async (request, reply) => {
      return new GetBoardGamesController( new GetBoardGamesUseCase(new SqliteBoardGameRepository(db)) ).handle();
    })

    fastify.post(`/`, async (request, reply) => {
      const { body } = request as { body: Parameters<typeof CreateBoardGameController.prototype.handle>[0] };

      return new CreateBoardGameController( new CreateBoardGameUseCase(new SqliteBoardGameRepository(db)) ).handle(body);
    })

    fastify.get(`/:boardGameId`, async (request, reply) => {
      const { boardGameId } = request.params as { boardGameId: string };

      return `Got Board Game ${boardGameId}\n`;
    })

    fastify.put(`/:boardGameId`, async (request, reply) => {
      const { boardGameId } = request.params as { boardGameId: string };

      return `Modified Board Game ${boardGameId}\n`;
    })

    fastify.delete(`/:boardGameId`, async (request, reply) => {
      const { boardGameId } = request.params as { boardGameId: string };

      return `Deleted Board Game ${boardGameId}\n`;
    })
  }
}

export default BoardGameRoutes;