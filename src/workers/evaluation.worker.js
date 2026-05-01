const { Worker } = require('bullmq');
const redisConnection = require('../config/reddis.config');
const axios = require('axios');
const SubmissionRepository = require('../repositories/submission.repository');

const submissionRepo = new SubmissionRepository();

const statusMap = {
  'SUCCESS': 'Success',
  'FAILED': 'WA',
  'TLE': 'TLE',
  'MLE': 'MLE',
  'ERROR': 'RE'
};

function evaluationWorker(queue) {
  new Worker(
    'EvaluationQueue',
    async (job) => {
      if (job.name === 'EvaluationJob') {
        try {
          const { submissionId, response: evaluationResponse, userId } = job.data;
          
          
          if (submissionId && evaluationResponse) {
            const finalStatus = statusMap[evaluationResponse.overallStatus] || 'RE';
            console.log(`Updating submission ${submissionId} status to ${finalStatus}`);
            await submissionRepo.updateSubmissionStatus(submissionId, finalStatus);
          }

          
          const response = await axios.post(
            'http://localhost:3000/sendPayload',
            {
              userId: userId,
              payload: job.data,
            }
          );
          
          console.log('Socket Service Response:', response.status);
        } catch (error) {
          console.error('Error in EvaluationWorker:', error.message);
        }
      }
    },
    { connection: redisConnection }
  );
}

module.exports = evaluationWorker;
