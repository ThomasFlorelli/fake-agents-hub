import Surreal, { StringRecordId, Table } from "surrealdb";

export type Agent = {
  id: string;
  name: string;
  agentType: {
    id: string;
    replies: Record<string, string[]>;
  };
};

export type CreateAgentInput = {
  name: string;
  agentType: string;
};

export class AgentsService {
  agentTable: Table;
  agentTypeTable: Table;

  constructor(private db: Surreal) {
    this.agentTable = new Table("agent");
    this.agentTypeTable = new Table("agent_type");
  }

  async create({ name, agentType }: CreateAgentInput): Promise<Agent> {
    const [agent] = await this.db.create(this.agentTable, {
      name,
      agentType: new StringRecordId(agentType),
    });
    
    return this.getById(agent.id.toString());
  }

  async getById(id: Agent['id']): Promise<Agent> {
    const [agents] = await this.db.query<[Agent[]]>(`
      SELECT *, agentType.id, agentType.replies FROM ${id};
    `);
    
    if (!agents || agents.length === 0) {
      throw new Error('Agent not found with id ' + id)
    }
    return agents[0];
  }

  async list(): Promise<Agent[]> {
    return this.db.select<Agent>(this.agentTable);
  }

  async remove(id: Agent['id']): Promise<boolean> {
    await this.db.query(`DELETE ${id};`);
    return true;
  }

  async getAgentReplies({
    agent,
    prompt
  }: {
    agent: Agent['id'],
    prompt: string
  }): Promise<Agent['agentType']['replies'][string]> {

    const [result] = await this.db.query<[{
      replies: Agent['agentType']['replies'][string]
    }][]>(`
      SELECT agentType.replies[$prompt] AS replies
      FROM ${agent};
    `, { prompt });

    return result[0]?.replies || [];
  }
}