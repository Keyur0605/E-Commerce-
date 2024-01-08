const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn");

const Banner = sequelize.define("Banner", {
  Id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  Image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Sale:{
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
});

module.exports = Banner