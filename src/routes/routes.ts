export default function routes(fastify: any, options: any, done: any) {
  fastify.get('/health', async () => {
    return { status: 'OK' };
  });

  done();
}