# Fake Agents Hub

API REST simple avec Fastify, TypeScript et SurrealDB.

## 🚀 Démarrage rapide

### Prérequis
- Node.js 20.x LTS
- Docker & Docker Compose
- npm

### Installation
```bash
npm install
```

## 📦 Scripts disponibles

### Build
```bash
npm run build
```
Compile le TypeScript vers JavaScript dans le dossier `dist/`

### Tests
```bash
npm test
```
Build et lance les containers Docker (DB + API), exécute les tests, puis arrête les containers

```bash
npm run test:watch
```
Lance les tests en mode watch

## 🛠️ Stack technique
- **Runtime**: Node.js 20.x
- **Framework**: Fastify
- **Language**: TypeScript
- **Database**: SurrealDB
- **Tests**: Vitest + Supertest
- **Dev tools**: tsx (watch mode)
