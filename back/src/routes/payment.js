const express = require("express");
const router = express.Router();
const Auth = require("../middleware/auth");
const { paymentVerification } = require("../controllers/payment");

// Verify
router.route("/verify").post(Auth, paymentVerification);

module.exports = router