import { FastifyInstance } from 'fastify'
import db from '../../infrastructure/repositories/sqlite/sqliteDatabase'
import { SqliteListRepository } from '../../infrastructure/repositories/sqlite/sqliteList.repository'
import { GetListsController } from '../../app/controllers/getLists.controller'
import { GetListsUseCase } from '../../app/useCases/getLists.useCase'
import { GetListController } from '../../app/controllers/getList.controller'
import { GetListUseCase } from '../../app/useCases/getList.useCase'
import { CreateListUseCase } from '../../app/useCases/createList.useCase'
import { CreateListController } from '../../app/controllers/createList.controller'
import { DeleteListController } from '../../app/controllers/deleteList.controller'
import { DeleteListUseCase } from '../../app/useCases/deleteList.useCase'
import { UpdateListController } from '../../app/controllers/updateList.controller'
import { UpdateListUseCase } from '../../app/useCases/updateList.useCase'

class ListRoutes {
  public prefix_route = '/players/:playerId/lists'

  async routes(fastify: FastifyInstance) {

    fastify.get(`/`, async (request) => {
      const { playerId } = request.params as { playerId: Parameters<typeof GetListsController.prototype.handle>[0]['playerId'] };

      return new GetListsController( new GetListsUseCase(new SqliteListRepository(db)) ).handle({ playerId});
    })

    fastify.post(`/`, async (request) => {
      const { body } = request as { body: Parameters<typeof CreateListController.prototype.handle>[0] };
      const { playerId } = request.params as { playerId: Parameters<typeof CreateListController.prototype.handle>[0]['playerId'] };

      return new CreateListController( new CreateListUseCase(new SqliteListRepository(db)) ).handle({ ...body, playerId});
    })

    fastify.get(`/:listId`, async (request) => {
      const { listId } = request.params as { listId: Parameters<typeof GetListController.prototype.handle>[0]['listId'] };

      return new GetListController( new GetListUseCase ( new SqliteListRepository(db) ) ).handle({ listId });
    })

    fastify.put(`/:listId`, async (request) => {
      const { listId } = request.params as { listId: Parameters<typeof UpdateListController.prototype.handle>[0]['listId'] };
      const { body } = request as { body: Parameters<typeof UpdateListController.prototype.handle>[0] };

      return new UpdateListController( new UpdateListUseCase ( new SqliteListRepository(db) ) ).handle({
        listId,
        name: body.name,
        boardGames: body.boardGames,
      });
    })

    fastify.delete(`/:listId`, async (request) => {
      const { listId } = request.params as { listId: Parameters<typeof DeleteListController.prototype.handle>[0]['listId'] };

      return new DeleteListController( new DeleteListUseCase ( new SqliteListRepository(db) ) ).handle({ listId });
    })
  }
}

export default ListRoutes;