const submissionService = require('./submission.service');
const fastifyPlugin = require('fastify-plugin');

async function servicePlugin(fastify, optionsms) {
  fastify.decorate(
    'submissionService',
    new submissionService(fastify.submissionRepository)
  );
}
module.exports = fastifyPlugin(servicePlugin);
