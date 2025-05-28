import { FastifyInstance } from 'fastify'
import db from '../../infrastructure/repositories/sqlite/sqliteDatabase'
import { SqlitePlayerRepository } from '../../infrastructure/repositories/sqlite/sqlitePlayer.repository'
import { GetPlayersController } from '../../app/controllers/getPlayers.controller'
import { GetPlayersUseCase } from '../../app/useCases/getPlayers.useCase'
import { GetPlayerController } from '../../app/controllers/getPlayer.controller'
import { GetPlayerUseCase } from '../../app/useCases/getPlayer.useCase'
import { CreatePlayerUseCase } from '../../app/useCases/createPlayer.useCase'
import { CreatePlayerController } from '../../app/controllers/createPlayer.controller'
import { DeletePlayerController } from '../../app/controllers/deletePlayer.controller'
import { DeletePlayerUseCase } from '../../app/useCases/deletePlayer.useCase'
import { UpdatePlayerController } from '../../app/controllers/updatePlayer.controller'
import { UpdatePlayerUseCase } from '../../app/useCases/updatePlayer.useCase'

class PlayerRoutes {
  public prefix_route = '/players'

  async routes(fastify: FastifyInstance) {

    fastify.get(`/`, async () => {
      return new GetPlayersController( new GetPlayersUseCase(new SqlitePlayerRepository(db)) ).handle();
    })

    fastify.post(`/`, async (request) => {
      const { body } = request as { body: Parameters<typeof CreatePlayerController.prototype.handle>[0] };

      return new CreatePlayerController( new CreatePlayerUseCase(new SqlitePlayerRepository(db)) ).handle(body);
    })

    fastify.get(`/:playerId`, async (request) => {
      const { playerId } = request.params as { playerId: Parameters<typeof GetPlayerController.prototype.handle>[0]['playerId'] };

      return new GetPlayerController( new GetPlayerUseCase ( new SqlitePlayerRepository(db) ) ).handle({ playerId });
    })

    fastify.put(`/:playerId`, async (request) => {
      const { playerId } = request.params as { playerId: Parameters<typeof UpdatePlayerController.prototype.handle>[0]['playerId'] };
      const { body } = request as { body: Parameters<typeof UpdatePlayerController.prototype.handle>[0] };

      return new UpdatePlayerController( new UpdatePlayerUseCase ( new SqlitePlayerRepository(db) ) ).handle({
        playerId,
        name: body.name,
        email: body.email,
      });
    })

    fastify.delete(`/:playerId`, async (request) => {
      const { playerId } = request.params as { playerId: Parameters<typeof DeletePlayerController.prototype.handle>[0]['playerId'] };

      return new DeletePlayerController( new DeletePlayerUseCase ( new SqlitePlayerRepository(db) ) ).handle({ playerId });
    })
  }
}

export default PlayerRoutes;