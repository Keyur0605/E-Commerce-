const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn");

const Order = sequelize.define("Order", {
  Id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  O_Number: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  U_Id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  Shipping_Details: {
    type: DataTypes.JSON,
    allowNull: false
  },
  OI_Id: {
    type: DataTypes.JSON,
    allowNull: false
  },
  Discount_Coupon: {
    type: DataTypes.STRING,
    defaultValue: "None" 
  },
  T_Price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  Payment_Status: {
    type: DataTypes.STRING,
    defaultValue: "Pending"
  },
  Order_Status: {
    type: DataTypes.STRING,
    defaultValue: "Pending"
  },
  Due_Refund_Amount: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  Total_Refund_Amount: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  Refund_Status: {
    type: DataTypes.STRING,
    defaultValue: "None"
  },
  Delivery_Date: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW
  }
},{
  initialAutoIncrement: 1000
});

module.exports = Order