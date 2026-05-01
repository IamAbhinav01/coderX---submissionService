const { Worker } = require('bullmq');
const redisConnection = require('../config/reddis.config');
const axios = require('axios');
const { connect } = require('mongoose');
const { connection } = require('../queue/submission.queue');

function evaluationWorker(queue) {
  new Worker(
    'EvaluationQueue',
    async (job) => {
      if (job.name === 'EvaluationJob') {
        try {
          const response = await axios.post(
            'http://localhost:3000/sendPayload',
            {
              userId: job.data.userId,
              payload: job.data,
            }
          );
          console.log(response);
          console.log(job.data);
        } catch (error) {
          console.log(error);
        }
      }
    },
    { connection: redisConnection }
  );
}
module.exports = evaluationWorker;
