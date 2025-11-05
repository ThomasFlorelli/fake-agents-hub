import { describe, it, expect, beforeAll } from 'vitest';
import { get, post, waitForApi } from '../../__tests__/utils';

describe('Routes (integration)', () => {
  beforeAll(async () => {
    await waitForApi();
  });

  it('Should create a conversation and return messages', async () => {
    const agentsRes = await get('/agents/agent:marie');
    expect(agentsRes.status).toBe(200);
    expect(agentsRes.body).toHaveProperty('id');
    const conversationRes = await post('/conversations', { agent: agentsRes.body.id , message: 'Bonjour' });
    expect(conversationRes.status).toBe(201);
    expect(conversationRes.body).toMatchObject({
      id: expect.any(String),
      messages: expect.arrayContaining([
        expect.objectContaining({ body: 'Bonjour', role: 'user' }),
      ])
    });
    const agentReply = conversationRes.body.messages.find((m: any) => m.role === 'agent');
    expect(agentReply).toBeDefined();
    const possibleReplies = [
      "Bonjour à vous aussi !",
      "Salut, comment puis-je vous aider aujourd'hui ?"
    ];
    expect(possibleReplies).toContain(agentReply.body);
    const res = await post(`/conversations/${conversationRes.body.id}/messages`, { message: "Pouvez-vous m'aider ?" });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      role: 'agent',
      body: 'Bien sûr, dites-moi en quoi je peux vous assister.'
    });
  });
});