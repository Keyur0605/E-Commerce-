const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/conn");

const User = sequelize.define("User", {
  Id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  Name: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      isAlpha: true
    }
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Otp: {
    type: DataTypes.INTEGER
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = User