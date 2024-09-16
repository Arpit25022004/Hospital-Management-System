'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      doctor.hasMany(models.appointments, {
        foreignKey: 'doc_id',
        as: 'appointments' // Alias for easier querying
      });
    }

    static async createDoctor(doctorData) {
      try{
        const newDoctor = await this.create(doctorData);
        return newDoctor;
      } catch (error) {
        console.error('Error creating Doctor:', error);
        throw error; // Rethrow error for handling at higher levels
      }
      }

    static async getAllDoctor(){
      try {
        const doctors = await this.findAll();
        return doctors;
      } catch (error) {
         console.error('Error fetching all doctors:', error);
        throw error; // Rethrow error for handling at higher levels
      }
    }

    static async getDoctorById(id) {
      try {
        const doctor = await this.findByPk(id);
        return doctor;
      } catch (error) {
        console.error('Error fetching doctor by ID:', error);
        throw error; // Rethrow error for handling at higher levels
      }
    }
  }
  doctor.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    phone_no: DataTypes.BIGINT,
    specializations: DataTypes.STRING,
    status_free: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
  }}, {
    sequelize,
    modelName: 'doctor',
  });
  return doctor;
};