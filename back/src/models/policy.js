const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn");

const Policy = sequelize.define("Policy", {
  Id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  Policy_Statement: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Policy