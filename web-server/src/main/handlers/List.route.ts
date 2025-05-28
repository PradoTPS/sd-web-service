import { FastifyInstance } from 'fastify'

class ListRoutes {
  public prefix_route = '/players/:playerId/lists'

  async routes(fastify: FastifyInstance) {

    fastify.get(`/`, async (request, reply) => {
      return 'Listed Lists!\n'
    })

    fastify.post(`/`, async (request, reply) => {
      return 'Created List!\n'
    })

    fastify.get(`/:listId`, async (request, reply) => {
      const { playerId, listId } = request.params as { playerId: string, listId: string };

      return `Got List ${listId} of Player ${playerId}\n`;
    })

    fastify.put(`/:listId`, async (request, reply) => {
      const { playerId, listId } = request.params as { playerId: string, listId: string };

      return `Modified List ${listId} of Player ${playerId}\n`;
    })

    fastify.delete(`/:listId`, async (request, reply) => {
      const { playerId, listId } = request.params as { playerId: string, listId: string };

      return `Deleted List ${listId} of Player ${playerId}\n`;
    })
  }
}

export default ListRoutes;