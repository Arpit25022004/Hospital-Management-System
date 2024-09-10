const doctorController = require('../controllers/doctor_controller');

async function doctorRoutes(fastify, options) {
  fastify.post('/doctors', doctorController.createDoctor);
  fastify.get('/doctors/list', doctorController.getAllDoctors);
  fastify.get('/doctors/:id', doctorController.getDoctorById);
  fastify.put('/doctors/:id', doctorController.updateDoctor);
  fastify.delete('/doctors/:id', doctorController.deleteDoctor);
}

module.exports = doctorRoutes;
