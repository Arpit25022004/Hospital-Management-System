const patientController = require('../controllers/patient_controller');
const authenticate=require('../middleware/authenticate');

async function patientRoutes(fastify, options) {
  fastify.post('/patients', { preHandler: authenticate.protectRoute }, patientController.createPatient);
  fastify.get('/patients/list',  { preHandler: authenticate.protectRoute },patientController.getAllPatients);
  fastify.get('/patients/:id',  { preHandler: authenticate.protectRoute },patientController.getPatientById);
  fastify.put('/patients/:id',  { preHandler: authenticate.protectRoute },patientController.updatePatient);
  fastify.delete('/patients/:id',  { preHandler: authenticate.protectRoute },patientController.deletePatient);
}

module.exports = patientRoutes;
