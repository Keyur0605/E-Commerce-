const express = require("express");
const router = express.Router();
const Auth = require("../middleware/auth");
const { userVerification, otpVerification, passwordUpdate } = require("../controllers/forgetPass")

// Verify
router.route("/email").post(userVerification);
router.route("/otp").post(Auth, otpVerification);
router.route("/password").patch(Auth, passwordUpdate);

module.exports = router