import type { FastifyInstance } from 'fastify';
import messagesRoutes, { prefix as messagesPrefix } from './messages/index.js';

export const prefix = '/:id';

export default async function (fastify: FastifyInstance) {
  fastify.register(messagesRoutes, { prefix: messagesPrefix });
}
