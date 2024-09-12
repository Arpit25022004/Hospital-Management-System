const { User }= require('../models');
const  validateUser  = require('../validators/user_validator');
const jwt=require('jsonwebtoken');
class UserControllers{
static async signup (req, reply)  {
  
  try {
    const { error } = validateUser.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.createUser(req.body);
    reply.code(201).send("creation successful");
  } catch (error) {
    reply.code(500).send(error);
  }
};

static async login (req, reply)  {
  try {
    const { error } = validateUser.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { username, password } = req.body; 
    console.log('REQUEST:',typeof(username),typeof(password));
    const user = await User.getuser(username,password);
    
    if (user) {
      const token = jwt.sign({id: user.id,username: user.username},'i am arpit');
      reply.send({ token, user  });
    } else {
      reply.code(401).send({ error: 'Invalid credentials' });
    }
  } catch (error) {
    reply.code(500).send({ error: 'Error logging in' });
  }
};
};

module.exports = UserControllers;
