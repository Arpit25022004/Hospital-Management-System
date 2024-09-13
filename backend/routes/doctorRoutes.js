const doctorController = require('../controllers/doctorController');
const authenticate=require('../middleware/authenticate');

async function doctorRoutes(fastify, options) {
  fastify.post('/doctors', { preHandler: authenticate.protectRoute }, doctorController.createDoctor);
  fastify.get('/doctors/list',  { preHandler: authenticate.protectRoute },doctorController.getAllDoctors);
  fastify.get('/doctors/:id', { preHandler: authenticate.protectRoute }, doctorController.getDoctorById);
  fastify.put('/doctors/:id', { preHandler: authenticate.protectRoute }, doctorController.updateDoctor);
  fastify.delete('/doctors/:id',  { preHandler: authenticate.protectRoute },doctorController.deleteDoctor);
}

module.exports = doctorRoutes;
