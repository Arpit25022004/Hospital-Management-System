const Bull = require('bull');
const jobProcessor = require('./jobProcessor');

const queue = new Bull('file-processing', {
  redis: {
    host: 'localhost',
    port: 6379
  }
});

queue.process(jobProcessor);

module.exports = queue;
