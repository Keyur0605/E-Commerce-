const express = require("express");
const router = express.Router();
const Auth = require("../middleware/auth");
const { addProduct, productList, filterProductListAdmin, productListById, filterProductList, productById, activeProduct, saleProduct, updateProduct, deleteProduct } = require("../controllers/product");

// Add 
router.route("/add").post(Auth, addProduct);

// Get
router.route("/list/:number").get(productList);
router.route("/filter/:number").get(Auth, filterProductListAdmin);
router.route("/list/:id/:number").get(productListById);
router.route("/filter/:id/:number").get(filterProductList);
router.route("/:id").get(productById);

// Update
router.route("/update").put(Auth, updateProduct);
router.route("/active").patch(Auth, activeProduct);
router.route("/sale").patch(Auth, saleProduct);

// Delete
router.route("/delete/:id").delete(Auth, deleteProduct);

module.exports = router