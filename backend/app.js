const Fastify = require('fastify');
const fastify = Fastify({ logger: true });
const cors = require('@fastify/cors');


// Enable CORS
fastify.register(cors, {
  origin: 'http://localhost:8080', // Adjust according to your needs
});

// Import routes
const appointmentRoutes = require('./routes/appointments_routes');
const doctorRoutes = require('./routes/doctor_routes');
const patientRoutes = require('./routes/patient_routes');
const userRoutes = require('./routes/user_routes');

// Register routes
fastify.register(appointmentRoutes);
fastify.register(doctorRoutes);
fastify.register(patientRoutes);
fastify.register(userRoutes);

// Error handling
fastify.setErrorHandler((error, request, reply) => {
  request.log.error(error);
  reply.status(500).send('Something went wrong!');
});

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    fastify.log.info(`Server listening on http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
