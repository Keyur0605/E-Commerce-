const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn");

const Coupon = sequelize.define("Coupon", {
  Id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  Coupon_Code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Discription: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Discount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  Min_Cart_Value: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

module.exports = Coupon