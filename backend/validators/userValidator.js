const Joi = require('joi');

class UserValidator {
  constructor() {
    this.userSchema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required()
    });
  }

  validate(data) {
    const { error } = this.userSchema.validate(data, { abortEarly: false });
    if (error) {
      return { error: error.details.map(d => d.message).join(', ') };
    }
    return { error: null };
  }
}

module.exports = new UserValidator();
