import { FastifyInstance } from 'fastify'

class BoardGameRoutes {
  public prefix_route = '/boardgames'

  async routes(fastify: FastifyInstance) {

    fastify.get(`/`, async (request, reply) => {
      return 'Listed Board Games!\n'
    })

    fastify.post(`/`, async (request, reply) => {
      return 'Created Board Game!\n'
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