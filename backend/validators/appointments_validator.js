const Joi = require('joi');
const validateIds = require('./validate_id'); // Import the custom validation function

class AppointmentValidator {
  constructor() {
    this.appointmentSchema = Joi.object({
      doc_id: Joi.number().integer().required(),
      pat_id: Joi.number().integer().required(),
      slot: Joi.number().integer().required()
    }).custom(this.customValidation.bind(this), 'Custom Validation for Foreign Keys');
  }

  async customValidation(value, helpers) {
    const { doc_id, pat_id } = value;
    try {
      await validateIds(doc_id, pat_id); // Custom function to check existence
    } catch (err) {
      return helpers.error('any.invalid');
    }
    return value; // Return the value if validation passes
  }

  validate(data) {
    const { error } = this.appointmentSchema.validate(data, { abortEarly: false });
    if (error) {
      return { error: error.details.map(d => d.message).join(', ') };
    }
    return { error: null };
  }
}

module.exports = new AppointmentValidator();
