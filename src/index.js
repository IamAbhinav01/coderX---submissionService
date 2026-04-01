const fastify = require('fastify')({ logger: true });
const app = require('./app');

fastify.register(app);

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
