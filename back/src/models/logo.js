const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn");

const Logo = sequelize.define("Logo", {
  Id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  Logo: {
    type: DataTypes.TEXT("long"),
    allowNull: false
  }
});

module.exports = Logo