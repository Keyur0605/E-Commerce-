const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn");
const MainCategory = require("./mainCategory");
const Category = require("../models/category");
const SubCategory = require("../models/subCategory");

const Product = sequelize.define("Product", {
  Id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Image: {
    type: DataTypes.JSON,
    allowNull: false
  },
  Brand:{
    type: DataTypes.STRING,
    allowNull: false
  },
  Description:{
    type: DataTypes.STRING,
    allowNull: false
  },
  Size_Quantity: {
    type: DataTypes.JSON,
    allowNull: false
  },
  Price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  S_Price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  Attributes: {
    type: DataTypes.JSON,
    allowNull: false
  },
  M_Id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  C_Id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  S_Id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  Wishlist_Status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  Active: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  Sale: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
});

module.exports = Product