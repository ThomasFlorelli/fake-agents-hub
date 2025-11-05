# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./
RUN npm ci

# Copier le code source
COPY . .

# Compiler TypeScript
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./
RUN npm ci --only=production

# Copier le code compilé
COPY --from=builder /app/dist ./dist

# Exposer le port
EXPOSE 3000

# Variables d'environnement par défaut
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Démarrer l'application
CMD ["node", "dist/index.js"]
