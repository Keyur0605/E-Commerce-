const express = require("express");
const router = express.Router();
const Auth = require("../middleware/auth");
const statistics = require("../controllers/statistics");

// Get
router.route("/").get(Auth, statistics);

module.exports = router