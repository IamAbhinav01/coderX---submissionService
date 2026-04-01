async function pingCheck(fastify, options) {
  fastify.get('/', () => {
    console.log(`pinged..`);
    return { message: 'pong' };
  });
}
module.exports = pingCheck;
