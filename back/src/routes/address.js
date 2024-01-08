const express = require("express");
const router = express.Router();
const Auth = require("../middleware/auth");
const {addAddress, getAddressList, deleteAddress} = require("../controllers/address");

// Add
router.route("/add").post(Auth, addAddress);

// Get
router.route("/list").get(Auth, getAddressList);

// Delete
router.route("/delete/:id").delete(Auth, deleteAddress);

module.exports = router