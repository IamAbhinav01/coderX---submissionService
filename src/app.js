const fastifyPlugin = require('fastify-plugin');
const repositoryPlugin = require('./repositories/repository.plugin');
const servicePlugin = require('./services/servicePlugin');

async function app(fastify, options) {
  fastify.register(require('@fastify/cors'));
  fastify.register(require('./routes/api/api.routes'), { prefix: '/api' });

  fastify.register(repositoryPlugin);
  fastify.register(servicePlugin);
}

module.exports = fastifyPlugin(app);
