const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/conn");

const Contact = sequelize.define("Contact", {
  Id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  Mobile: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        isEmail: true
    }
  },
  Address: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Contact