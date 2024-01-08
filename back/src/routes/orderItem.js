const express = require("express");
const router = express.Router();
const Auth = require("../middleware/auth");
const { getOrderItemListAdmin, getOrderItemList, updateOrderItemQuantity, deleteOrderItem } = require("../controllers/orderItem");

// Get
router.route("/list/admin/:id").get(Auth, getOrderItemListAdmin);
router.route("/list").get(Auth, getOrderItemList);

// Update
router.route("/update").patch(Auth, updateOrderItemQuantity);

// Delete
router.route("/delete/:oId/:id").delete(Auth, deleteOrderItem);

module.exports = router