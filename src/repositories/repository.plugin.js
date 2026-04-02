const submissionRepository = require('../repositories/submission.repository');
const fastifyPlugin = require('fastify-plugin');

async function repositoryPlugin(fastify, options) {
  fastify.decorate('submissionRepository', new submissionRepository());
}
module.exports = fastifyPlugin(repositoryPlugin);
