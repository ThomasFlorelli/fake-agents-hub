import type { FastifyInstance } from 'fastify';

export const prefix = '/:id';

export default async function (fastify: FastifyInstance) {
  fastify.get('/', async (request, reply) => {
    const params = request.params as { id: string };
    const a = await fastify.services.agentsService.getById(params.id);
    if (!a) return reply.code(404).send({ error: 'not_found' });
    return a;
  });

  fastify.delete('/', async (request, reply) => {
    const params = request.params as { id: string };
    const ok = await fastify.services.agentsService.remove(params.id);
    if (!ok) return reply.code(404).send({ error: 'not_found' });
    return { id: params.id, deleted: true };
  });
}