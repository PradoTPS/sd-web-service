import { FastifyInstance } from 'fastify'
import db from '../../infrastructure/repositories/sqlite/sqliteDatabase'
import { SqliteListRepository } from '../../infrastructure/repositories/sqlite/sqliteList.repository'
import { GetAllListsController } from '../../app/controllers/getAllLists.controller'
import { GetAllListsUseCase } from '../../app/useCases/getAllLists.useCase'

class ListRoute {
  public prefix_route = '/lists'

  async routes(fastify: FastifyInstance) {

    fastify.get(`/`, async () => {
      return new GetAllListsController( new GetAllListsUseCase(new SqliteListRepository(db)) ).handle();
    })
  }
}

export default ListRoute;