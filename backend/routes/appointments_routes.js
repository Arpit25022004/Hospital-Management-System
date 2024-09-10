const appointmentController = require('../controllers/appointments_controller');

async function appointmentRoutes(fastify, options) {
  fastify.post('/appointments', appointmentController.createAppointment);
  fastify.get('/appointments/list', appointmentController.getAllAppointments);
  fastify.get('/appointments/:id', appointmentController.getAppointmentById);
  fastify.put('/appointments/:id', appointmentController.updateAppointment);
  fastify.delete('/appointments/:id', appointmentController.deleteAppointment);
}

module.exports = appointmentRoutes;
