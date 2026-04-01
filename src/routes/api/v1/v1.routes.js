async function v1Plugin(fastify, options) {
  fastify.register(require('./ping.routes'), { prefix: '/ping' });
}
module.exports = v1Plugin;
