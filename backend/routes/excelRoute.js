const multer = require('fastify-multer');
const bulkController = require('../controllers/bulkController');

// Configure multer to store uploaded files in the './uploads/' directory
const upload = multer({ dest: './uploads/' });

module.exports = function (fastify, options, done) {
  // Define the route for file uploads
  fastify.post('/upload', { preHandler: upload.single('file') }, bulkController.handleFileUpload);

  done();
};
