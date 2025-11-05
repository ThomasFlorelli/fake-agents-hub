import type { FastifyInstance } from 'fastify';
import conversationIdRoutes, { prefix as conversationIdPrefix } from './{id}/index.js';

export const prefix = '/conversations';

export default async function (fastify: FastifyInstance) {
  fastify.post('/', async (request, reply) => {
    const body = request.body as {
      agent: string
      message: string;
    };

    const conversation = await fastify.services.conversationsService.create({
      agent: body.agent,
    });

    await fastify.services.conversationsService.addMessage({
      conversation: conversation.id,
      role: 'user',
      body: body.message,
    })

    const replies = await fastify.services.agentsService.getAgentReplies({
      agent: conversation.agent.id.toString(),
      prompt: body.message,
    });

    let replyBody: string = "Je ne suis pas sûr de la réponse.";

    if (replies.length > 0) {
      replyBody = replies[Math.floor(Math.random() * replies.length)];
    }

    await fastify.services.conversationsService.addMessage({
      conversation: conversation.id,
      role: 'agent',
      body: replyBody,
    });

    reply.code(201);
    return fastify.services.conversationsService.getById(conversation.id);
  });

  fastify.register(conversationIdRoutes, { prefix: conversationIdPrefix });
}
