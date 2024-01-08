const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/conn");
const Category = require("./category");
const MainCategory = require("./mainCategory");

const SubCategory = sequelize.define("SubCategory", {
  Id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  C_Id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  M_Id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  Image:{
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = SubCategory