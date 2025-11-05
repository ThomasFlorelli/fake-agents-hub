import Fastify from 'fastify';
import routes from './routes/index.js';
import { Services } from './services/index.js';

export function buildApp(opts: { services: Services }) {
  const fastify = Fastify({ logger: false });

  fastify.decorate('services', opts.services);

  fastify.register(routes);

  return fastify;
}

export default buildApp;
