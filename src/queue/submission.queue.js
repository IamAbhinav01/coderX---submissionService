const { Queue } = require('bullmq');
const redisClient = require('../config/reddis.config');

module.exports = new Queue('SubmissionQueue', { connection: redisClient });
