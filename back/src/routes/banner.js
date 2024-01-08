const express = require("express");
const router = express.Router();
const Auth = require("../middleware/auth");
const { addBannerImage, getBannerImage, deleteBannerImageById } = require("../controllers/banner");

// Add 
router.route("/add").post(Auth, addBannerImage);

// Get
router.route("/list").get(getBannerImage);

// Delete
router.route("/delete/:id").delete(Auth, deleteBannerImageById);

module.exports = router