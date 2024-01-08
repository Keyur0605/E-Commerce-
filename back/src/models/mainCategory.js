const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/conn");

const MainCategory = sequelize.define("MainCategory", {
  Id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  Image:{
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = MainCategory