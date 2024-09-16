const path = require('path');
const fs = require('fs');
const queue = require('../jobs/queue');
const bulkValidator = require('../validators/bulkValidator');

class bulkController {
  static async handleFileUpload(request, reply) {
    const file = request.file;
    console.log(file);
    if (!file) {
      return reply.status(400).send({ error: 'No file uploaded' });
    }

    const filePath = path.join(__dirname, '../uploads', file.filename);

    try {
      if (!bulkValidator.validateXlsxFile(file)) {
        fs.unlinkSync(filePath); // Clean up the invalid file
        return reply.status(400).send({ error: 'Invalid file type. Only .xlsx files are allowed.' });
      }

      // Enqueue the file path for processing
      await queue.add({ filePath });

      reply.send({ message: 'File enqueued for processing.' });
    } catch (error) {
      fs.unlinkSync(filePath); // Clean up the file on error
      reply.status(500).send({ error: 'Error processing file' });
    }
  }
}

module.exports = bulkController;
