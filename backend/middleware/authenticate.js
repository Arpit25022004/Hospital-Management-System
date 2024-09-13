// Protect this route
class authenticate{
    static rotectRoute = async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ error: 'Invalid or expired token' });
    }
  };
}

module.exports=authenticate;