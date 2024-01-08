const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn");
const User = require("./register");

const Wishlist = sequelize.define("Wishlist", {
  Id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  U_Id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  P_Id: {
    type: DataTypes.JSON,
    allowNull: false
  },
});

module.exports = Wishlist