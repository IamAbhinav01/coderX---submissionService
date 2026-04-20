const Redis = require('ioredis');
const serverConfig = require('./server.config');

const redisConfig = {
  port: serverConfig.REDIS_PORT,
  host: serverConfig.REDIS_HOST,
  maxRetriesPerRequest: null,
};
const redisClient = new Redis(redisConfig);

module.exports = redisClient;
