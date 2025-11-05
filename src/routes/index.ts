import type { FastifyPluginAsync } from 'fastify';
import health, { prefix as healthPrefix } from './health/index.js';
import agents, { prefix as agentsPrefix } from './agents/index.js';
import conversations, { prefix as conversationsPrefix } from './conversations/index.js';

const routes: FastifyPluginAsync = async (fastify) => {
  fastify.register(health, { prefix: healthPrefix });
  fastify.register(agents, { prefix: agentsPrefix });
  fastify.register(conversations, { prefix: conversationsPrefix });
};

export default routes;
