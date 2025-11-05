import type { FastifyInstance } from 'fastify';
import agentsIdRoutes, { prefix as agentsIdRoutesPrefix } from './{id}/index.js';
import { CreateAgentInput } from '../../services/agents.js';

export const prefix = '/agents';

export default async function (fastify: FastifyInstance) {
  fastify.get('/', async () => {
    return await fastify.services.agentsService.list();
  });

  fastify.post('/', async (request, reply) => {
    const body = request.body as Partial<CreateAgentInput>;
    if (!body.agentType) {
      body.agentType = 'agent_type:default';
    }
    const created = await fastify.services.agentsService.create(body as CreateAgentInput);
    reply.code(201);
    return created;
  });

  fastify.register(agentsIdRoutes, { prefix: agentsIdRoutesPrefix });
}