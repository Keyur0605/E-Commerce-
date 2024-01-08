const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn");

const OrderItem = sequelize.define("OrderItem", {
  Id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  P_Id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  Size_Quantity: {
    type: DataTypes.JSON,
    allowNull: false
  },
  Quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  T_Price: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

module.exports = OrderItem