const express = require("express");
const router = express.Router();
const Auth = require("../middleware/auth");
const { addLogo, getLogo, deleteLogo } = require("../controllers/logo");

// Add
router.route("/add").post(Auth, addLogo);

// Get
router.route("/image").get(getLogo);

// Delete
router.route("/delete").delete(Auth, deleteLogo);

module.exports = router