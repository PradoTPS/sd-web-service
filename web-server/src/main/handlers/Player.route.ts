import { FastifyInstance } from 'fastify'

class PlayerRoutes {
  public prefix_route = '/players'

  async routes(fastify: FastifyInstance) {

    fastify.get(`/`, async (request, reply) => {
      return 'Listed Players!\n'
    })

    fastify.post(`/`, async (request, reply) => {
      return 'Created Player!\n'
    })

    fastify.get(`/:playerId`, async (request, reply) => {
      const { playerId } = request.params as { playerId: string };

      return `Got Player ${playerId}\n`;
    })

    fastify.put(`/:playerId`, async (request, reply) => {
      const { playerId } = request.params as { playerId: string };

      return `Modified Player ${playerId}\n`;
    })

    fastify.delete(`/:playerId`, async (request, reply) => {
      const { playerId } = request.params as { playerId: string };

      return `Deleted Player ${playerId}\n`;
    })
  }
}

export default PlayerRoutes;