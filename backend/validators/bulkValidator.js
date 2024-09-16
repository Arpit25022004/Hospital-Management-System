const path = require('path');

class bulkValidator {
  static validateXlsxFile(file) {
    const extname = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;

    return extname === '.xlsx' && mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  }
}

module.exports = bulkValidator;