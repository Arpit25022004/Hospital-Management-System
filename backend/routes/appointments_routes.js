const appointmentController = require('../controllers/appointments_controller');
const authenticate=require('../middleware/authenticate');

async function appointmentRoutes(fastify, options) {
  fastify.post('/appointments', { preHandler: authenticate.protectRoute }, appointmentController.createAppointment);
  fastify.get('/appointments/list',  { preHandler: authenticate.protectRoute },appointmentController.getAllAppointments);
  fastify.get('/appointments/:id',  { preHandler: authenticate.protectRoute },appointmentController.getAppointmentById);
  fastify.put('/appointments/:id',  { preHandler: authenticate.protectRoute },appointmentController.updateAppointment);
  fastify.delete('/appointments/:id',  { preHandler: authenticate.protectRoute },appointmentController.deleteAppointment);
}

module.exports = appointmentRoutes;
