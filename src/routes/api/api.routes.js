async function apiPlugin(fastify, options) {
  fastify.register(require('./v1/v1.routes'), { prefix: '/v1' });
}
module.exports = apiPlugin;
