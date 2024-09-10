'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static async getuser(username,password) {
      try {
        const user = await this.findOne( {where: { username, password } });
        return user;
      } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
      }}

    static async createUser(UserData) {
      try {
        const newUser = await this.create(UserData);
        return newUser;
      } catch (error) {
        console.error('Error creating user:', error);
        throw error; // Rethrow error for handling at higher levels
      }
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
      allowNull:false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};