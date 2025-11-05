CREATE agent_type:default SET
    replies = {
        "Hello": ["Hi there!", "Hello! How can I assist you today?"],
        "How are you?": ["I'm just a program, but thanks for asking!", "Doing great, thanks! How can I help you?"],
        "Goodbye": ["See you later!", "Goodbye! Have a great day!"]
    };

CREATE agent_type:client_relations SET
    replies = {
        "Bonjour": ["Bonjour à vous aussi !", "Salut, comment puis-je vous aider aujourd'hui ?"],
        "Merci": ["Avec plaisir !", "Je vous en prie, c’est mon rôle 🙂"],
        "Au revoir": ["Bonne journée à vous !", "À bientôt !"],
        "Pouvez-vous m'aider ?": ["Bien sûr, dites-moi en quoi je peux vous assister."]
    };

CREATE agent:marie SET
    name = "Marie",
    agentType = agent_type:client_relations;
