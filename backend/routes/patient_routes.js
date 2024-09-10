const patientController = require('../controllers/patient_controller');

async function patientRoutes(fastify, options) {
  fastify.post('/patients', patientController.createPatient);
  fastify.get('/patients/list', patientController.getAllPatients);
  fastify.get('/patients/:id', patientController.getPatientById);
  fastify.put('/patients/:id', patientController.updatePatient);
  fastify.delete('/patients/:id', patientController.deletePatient);
}

module.exports = patientRoutes;
