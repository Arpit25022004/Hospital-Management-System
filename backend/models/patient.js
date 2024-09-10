'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Patient.hasMany(models.appointments, {
        foreignKey: 'pat_id',
        as: 'appointments' // Alias for easier querying
      });
    }

    static async createPatient(patientData) {
      try {
        const newPatient = await this.create(patientData);
        return newPatient;
      } catch (error) {
        console.error('Error creating patient:', error);
        throw error; // Rethrow error for handling at higher levels
      }
    }

    static async getAllPatients() {
      try {
        const patients = await this.findAll();
        return patients;
      } catch (error) {
        console.error('Error fetching all patients:', error);
        throw error; // Rethrow error for handling at higher levels
      }
    }

    static async getPatientById(id) {
      try {
        const patient = await this.findByPk(id);
        return patient;
      } catch (error) {
        console.error('Error fetching patient by ID:', error);
        throw error; // Rethrow error for handling at higher levels
      }
    }
  }
  Patient.init({
    id:  {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};