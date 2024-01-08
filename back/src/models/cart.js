const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn");
const User = require("./register");
const Product = require("./product");

const Cart = sequelize.define("Cart", {
  Id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  U_Id: {
    type: DataTypes.UUID,
    onDelete: "CASCADE",
    references: { 
        model: User,
        key: "Id"
    }
  },
  P_Id: {
    type: DataTypes.UUID,
    onDelete: "CASCADE",
    references: { 
        model: Product,
        key: "Id"
    }
  },
  Size_Quantity: {
    type: DataTypes.JSON,
    allowNull: false
  }
});

module.exports = Cart