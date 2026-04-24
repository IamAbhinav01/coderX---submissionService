const fastify = require('fastify')({ logger: true });
const app = require('./app');
const serverConfig = require('./config/server.config');
const connectToDB = require('./config/db.config');
fastify.register(app);

fastify.listen({ port: serverConfig.PORT }, async (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  await connectToDB();
  console.log(`Server listening at ${address}`);
});
