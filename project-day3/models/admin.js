'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Admin.init({
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
      }
  },
    {
    sequelize,
    modelName: 'Admin',
  });
  Admin.beforeCreate(async (admin, options) => {
    const salt = await bcrypt.genSalt();
    admin.password = await bcrypt.hash(admin.password,salt);
    
  });
  return Admin;
};