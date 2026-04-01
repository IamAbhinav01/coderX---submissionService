const fastifyPlugin = require('fastify-plugin');

async function app(fastify, options) {
  fastify.register(require('@fastify/cors'));
  fastify.register(require('./routes/api/api.routes'), { prefix: '/api' });
}

module.exports = fastifyPlugin(app);
