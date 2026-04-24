const submissionQueue = require('../queue/submission.queue');

module.exports = async function (payload) {
  await submissionQueue.add('SubmissionJob', payload);
  console.log('successfully added a new JOB');
};
