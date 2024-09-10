const Joi = require('joi');

class patient_validators {
  constructor() {
    this.patientSchema = Joi.object({
      name: Joi.string().required(),
      age: Joi.number().integer().min(0).required(),
      gender: Joi.string().valid('male', 'female', 'other').required()
    });
  }

  validate(data) {
    const { error } = this.patientSchema.validate(data);
    if (error) {
      return { error: error.details.map(d => d.message).join(', ') };
    }
    return { error: null };
  }
}

module.exports = new patient_validators();
