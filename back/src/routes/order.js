const express = require("express");
const router = express.Router();
const Auth = require("../middleware/auth");
const { addOrder, getOrderListAdmin, filterOrderByNumber, updateOrderStatus, updateRefundStatus, deleteOrder } = require("../controllers/order");

// Add
router.route("/add").post(Auth, addOrder);

// Get
router.route("/list/:number").get(Auth, getOrderListAdmin);
router.route("/:number").get(Auth, filterOrderByNumber);

// Update
router.route("/update").patch(Auth, updateOrderStatus);
router.route("/update/refund").patch(Auth, updateRefundStatus);

// Delete
router.route("/delete/:id").delete(Auth, deleteOrder);

module.exports = router