// validators/validateIds.js
const { Doctor, Patient } = require('../models'); // Import your Sequelize models

async function validateIds(docId, patId) {
  const doctorExists = await Doctor.findByPk(docId);
  const patientExists = await Patient.findByPk(patId);

  if (!doctorExists) {
    throw new Error(`Doctor with ID ${docId} does not exist.`);
  }

  if (!patientExists) {
    throw new Error(`Patient with ID ${patId} does not exist.`);
  }
}

module.exports = validateIds;
