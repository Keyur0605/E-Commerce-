const express = require("express");
const router = express.Router();
const Auth = require("../middleware/auth");
const { addToCart, cartList, updateQuantity, deleteCartItem } = require("../controllers/cart");

// Add 
router.route("/add").post(Auth, addToCart);

// Get
router.route("/list").get(Auth, cartList);

// Update
router.route("/update").patch(Auth, updateQuantity);

// Delete
router.route("/delete/:id").delete(Auth, deleteCartItem);

module.exports = router