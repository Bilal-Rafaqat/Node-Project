'use strict';
const bcrypt = require('bcrypt');
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
  }
  
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len:[4,10]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len:[4,10]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
        }
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false
      },
      token: {
        type: DataTypes.STRING
      }
  },
    {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(async (user, options) => {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password,salt);
    
  });
  return User;
};