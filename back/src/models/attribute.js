const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/conn");

const Attribute = sequelize.define("Attribute", {
  Id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  Name: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  G_Name: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = Attribute