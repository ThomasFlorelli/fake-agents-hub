import type { FastifyInstance } from 'fastify';
import { Message } from '../../../../services/conversations';

export const prefix = '/messages';

export default async function (fastify: FastifyInstance) {
  fastify.post('/', async (request, reply) => {
    const params = request.params as {
      conversationId: string
    };
    const body = request.body as {
      message: string;
    };

    const conversation = await fastify.services.conversationsService.getById(params.conversationId);

    await fastify.services.conversationsService.addMessage({
      conversation: conversation.id,
      role: 'user',
      body: body.message,
    })

    const replies = await fastify.services.agentsService.getAgentReplies({
      agent: conversation.agent.id,
      prompt: body.message,
    });

    let replyBody: string = "Je ne suis pas sûr de la réponse.";

    if (replies.length > 0) {
      replyBody = replies[Math.floor(Math.random() * replies.length)];
    }

    reply.code(201);
    return fastify.services.conversationsService.addMessage({
      conversation: conversation.id,
      role: 'agent',
      body: replyBody,
    })
  });
}
