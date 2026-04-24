async function v1Plugin(fastify, options) {
  fastify.register(require('./submission.routes'), { prefix: '/submissions' });
}
module.exports = v1Plugin;
