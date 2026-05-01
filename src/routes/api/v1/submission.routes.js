const { createSubmission, getUserSubmissions } = require('../../../controllers/submission.controller');

async function submissionRoutes(fastify, options) {
  fastify.post('/', createSubmission);
  fastify.get('/user/:userId', getUserSubmissions);
}

module.exports = submissionRoutes;
