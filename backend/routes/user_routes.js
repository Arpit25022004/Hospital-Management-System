// routes/user.routes.js
const auth = require('../controllers/user_controllers');

async function userRoutes(fastify,options) {
  fastify.post('/signup', auth.signup);
  fastify.post('/login', auth.login);
};

module.exports = userRoutes;
