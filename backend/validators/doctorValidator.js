const Joi = require('joi');

class DoctorValidator {
  constructor() {
    this.doctorSchema = Joi.object({
      name: Joi.string().required(),
      phone_no: Joi.string().custom(this.digitCount.bind(this), 'Phone number digit count validation').required(),
      status_free: Joi.boolean().default(true),
      specializations: Joi.string().required()
    });
  }

  digitCount(value, helpers) {
    const digitOnly = value.replace(/\D/g, ''); // Remove non-digit characters
    if (digitOnly.length !== 10) {
      return helpers.error('any.invalid');
    }
    return value;
  }

  validate(data) {
    const { error } = this.doctorSchema.validate(data, { abortEarly: false });
    if (error) {
      return { error: error.details.map(d => d.message).join(', ') };
    }
    return { error: null };
  }
}

module.exports = new DoctorValidator();
