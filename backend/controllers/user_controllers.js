const { User }= require('../models');
const  validateUser  = require('../validators/user_validator');

class user_controllers{
static async signup (req, reply)  {
  
  try {
    const { error } = validateUser.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.createUser(req.body);
    reply.code(201).send("hello");
  } catch (error) {
    reply.code(500).send(error);
  }
};

static async login (req, reply)  {

  try {
    const user = await User.getuser(req.params.username,req.params.password);
    
    if (user) {
      reply.send({ id: user.id, username: user.username });
    } else {
      reply.code(401).send({ error: 'Invalid credentials' });
    }
  } catch (error) {
    reply.code(500).send({ error: 'Error logging in' });
  }
};
};

module.exports = user_controllers;
