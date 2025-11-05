import { buildApp } from './app.js';
import { connect } from './db/connect.js';
import { AgentsService } from './services/agents.js';
import { ConversationsService } from './services/index.js';

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

export const start = async () => {
  const surreal = await connect();
  const fastify = buildApp({
    services: {
      agentsService: new AgentsService(surreal),
      conversationsService: new ConversationsService(surreal),
    },
  });

  try {
    await fastify.listen({ port: Number(PORT), host: HOST });
    console.log(`Server listening on http://${HOST}:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

