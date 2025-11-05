import Surreal, { StringRecordId, Table } from "surrealdb";

export type Message = {
  body: string;
  timestamp: string;
  role: "agent" | "user";
}

export type Conversation = {
  id: string;
  agent: {
    id: string;
  };
  messages: Message[];
}

export type CreateConversationInput = {
  agent: string;
};

export type CreateMessageInput = {
  conversation: string;
  body: string;
  role: "agent" | "user";
};


export class ConversationsService {
  messageTable: Table;
  conversationTable: Table;


  constructor(private db: Surreal) {
    this.messageTable = new Table("message");
    this.conversationTable = new Table("conversation");
  }

  async create({ agent }: CreateConversationInput): Promise<Conversation> {
    const [conversation] = await this.db.create(this.conversationTable, {
      agent: new StringRecordId(agent),
      messages: [],
    });
    return this.getById(conversation.id.toString());
  }

  async getById(id: Conversation['id']): Promise<Conversation> {
    const [conversations] = await this.db.query<[Conversation[]]>(`
      SELECT 
        *,
        agent.id,
        (SELECT * FROM message WHERE conversation = $parent.id ORDER BY timestamp) AS messages
      FROM conversation;
    `);

    if (!conversations || conversations.length === 0) {
      throw new Error('Agent not found with id ' + id)
    }
    return conversations[0];
  }

  async addMessage({ conversation, body, role }: CreateMessageInput): Promise<Message> {
    const [message] = await this.db.create<Message, CreateMessageInput>(this.messageTable, {
      body,
      role,
      conversation,
    });
    return message;
  }
}