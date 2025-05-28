import { FastifyInstance } from 'fastify'
import db from '../../infrastructure/repositories/sqlite/sqliteDatabase'
import { SqliteBoardGameRepository } from '../../infrastructure/repositories/sqlite/sqliteBoardGame.repository'
import { GetBoardGamesController } from '../../app/controllers/getBoardGames.controller'
import { GetBoardGamesUseCase } from '../../app/useCases/getBoardGames.useCase'
import { GetBoardGameController } from '../../app/controllers/getBoardGame.controller'
import { GetBoardGameUseCase } from '../../app/useCases/getBoardGame.useCase'
import { CreateBoardGameUseCase } from '../../app/useCases/createBoardGame.useCase'
import { CreateBoardGameController } from '../../app/controllers/createBoardGame.controller'
import { DeleteBoardGameController } from '../../app/controllers/deleteBoardGame.controller'
import { DeleteBoardGameUseCase } from '../../app/useCases/deleteBoardGame.useCase'
import { UpdateBoardGameController } from '../../app/controllers/updateBoardGame.controller'
import { UpdateBoardGameUseCase } from '../../app/useCases/updateBoardGame.useCase'

class BoardGameRoutes {
  public prefix_route = '/boardgames'

  async routes(fastify: FastifyInstance) {

    fastify.get(`/`, async () => {
      return new GetBoardGamesController( new GetBoardGamesUseCase(new SqliteBoardGameRepository(db)) ).handle();
    })

    fastify.post(`/`, async (request) => {
      const { body } = request as { body: Parameters<typeof CreateBoardGameController.prototype.handle>[0] };

      return new CreateBoardGameController( new CreateBoardGameUseCase(new SqliteBoardGameRepository(db)) ).handle(body);
    })

    fastify.get(`/:boardGameId`, async (request) => {
      const { boardGameId } = request.params as { boardGameId: Parameters<typeof GetBoardGameController.prototype.handle>[0]['boardGameId'] };

      return new GetBoardGameController( new GetBoardGameUseCase ( new SqliteBoardGameRepository(db) ) ).handle({ boardGameId });
    })

    fastify.put(`/:boardGameId`, async (request) => {
      const { boardGameId } = request.params as { boardGameId: Parameters<typeof UpdateBoardGameController.prototype.handle>[0]['boardGameId'] };
      const { body } = request as { body: Parameters<typeof UpdateBoardGameController.prototype.handle>[0] };

      return new UpdateBoardGameController( new UpdateBoardGameUseCase ( new SqliteBoardGameRepository(db) ) ).handle({
        boardGameId,
        name: body.name,
        description: body.description,
        link: body.link,
      });
    })

    fastify.delete(`/:boardGameId`, async (request) => {
      const { boardGameId } = request.params as { boardGameId: Parameters<typeof DeleteBoardGameController.prototype.handle>[0]['boardGameId'] };

      return new DeleteBoardGameController( new DeleteBoardGameUseCase ( new SqliteBoardGameRepository(db) ) ).handle({ boardGameId });
    })
  }
}

export default BoardGameRoutes;