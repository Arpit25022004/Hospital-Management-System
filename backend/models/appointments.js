'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class appointments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      appointments.belongsTo(models.doctor, {
        foreignKey: 'doc_id',
        as: 'doctor' // Alias for easier querying
      });

      // Many-to-One association with Patient
      appointments.belongsTo(models.Patient, {
        foreignKey: 'pat_id',
        as: 'patient' // Alias for easier querying
      });

    }

    /**
     * Schedule a new appointment, update doctor's status, and set a timer to delete it after 1 minute.
     * @param {Object} appointmentData - The data for the new appointment.
     * @returns {Promise<Appointment>} - The newly created appointment instance.
     */
    static async scheduleAppointment(appointmentData) {
      const { doc_id } = appointmentData;
      console.log(sequelize.models);

      try {
        // Update doctor's status to false (not free) when scheduling an appointment
        await sequelize.models.doctor.update(
          { status_free: false },
          { where: { id: doc_id } }
        );

        // Create a new appointment record with the provided data
        const newAppointment = await this.create(appointmentData);

        // Schedule the deletion of the appointment after 1 minute (60000 milliseconds)
        setTimeout(async () => {
          try {
            await this.deleteAppointment(newAppointment.id, doc_id);
          } catch (error) {
            console.error('Error deleting appointment:', error);
          }
        }, 14400000); // 1 minute in milliseconds

        return newAppointment; // Return the newly created appointment instance
      } catch (error) {
        console.error('Error scheduling appointment:', error); // Log any errors
        throw error; // Rethrow the error for handling at higher levels
      }
    }

    /**
     * Delete an appointment by its ID and update the doctor's status to true.
     * @param {number} id - The ID of the appointment to delete.
     * @param {number} doc_id - The ID of the doctor to update.
     * @returns {Promise<number>} - The number of rows affected (0 or 1).
     */
    static async deleteAppointment(id, doc_id) {
      try {
        // Delete the appointment record by its primary key (ID)
        const result = await this.destroy({
          where: { id }
        });

        // Update doctor's status to true (free) after appointment deletion
        await sequelize.models.Doctor.update(
          { status_free: true },
          { where: { id: doc_id } }
        );

        return result; // Return the number of rows affected (1 if deleted, 0 if not found)
      } catch (error) {
        console.error('Error deleting appointment:', error); // Log any errors
        throw error; // Rethrow the error for handling at higher levels
      }
    }
  }
  appointments.init({
    id:  {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    doc_id: DataTypes.INTEGER,
    pat_id: DataTypes.INTEGER,
    slot: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'appointments',
  });
  return appointments;
};