const express = require("express");
const router = express.Router();
const Auth = require("../middleware/auth");
const {addToWishlist, wishlistList, deleteProduct} = require("../controllers/wishlist");

// Add 
router.route("/add").post(Auth, addToWishlist);

// Get
router.route("/list").get(Auth, wishlistList);

// Delete
router.route("/delete/:id").delete(Auth, deleteProduct);

module.exports = router