
DEFINE TABLE agent_type SCHEMAFULL;
DEFINE FIELD replies ON TABLE agent_type FLEXIBLE TYPE object;

DEFINE TABLE agent SCHEMAFULL;
DEFINE FIELD name ON TABLE agent TYPE string;
DEFINE FIELD agentType ON agent TYPE record<agent_type>;

DEFINE TABLE MESSAGE SCHEMAFULL;
DEFINE FIELD body ON TABLE MESSAGE TYPE string;
DEFINE FIELD timestamp ON TABLE MESSAGE TYPE datetime DEFAULT time::now();
DEFINE FIELD role ON TABLE MESSAGE TYPE "agent" | "user";
DEFINE FIELD conversation ON TABLE MESSAGE TYPE record<conversation>;  -- ← relation inverse

DEFINE TABLE conversation SCHEMAFULL;
DEFINE FIELD agent ON TABLE conversation TYPE record<agent>;
