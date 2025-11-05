import type { FastifyInstance } from 'fastify';

export const prefix = '/health';

export default async function (fastify: FastifyInstance) {
  fastify.get('/', async () => ({ status: 'OK' }));
}