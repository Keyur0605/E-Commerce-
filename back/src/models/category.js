const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/conn");
const MainCategory = require("./mainCategory");

const Category = sequelize.define('Category', {
  Id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  M_Id: {
    type: DataTypes.UUID,
    allowNull: false
  }
});

module.exports = Category