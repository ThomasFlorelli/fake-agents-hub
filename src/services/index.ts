import type { AgentsService as AgentsServiceClass } from './agents.js';
import { ConversationsService as ConversationServiceClass } from './conversations.js';

export type Services = {
  agentsService: AgentsServiceClass;
  conversationsService: ConversationServiceClass
};

export { AgentsService } from './agents.js';
export { ConversationsService } from './conversations.js';
