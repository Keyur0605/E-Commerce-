const express = require("express");
const router = express.Router();
const Auth = require("../middleware/auth");
const {addContactDetails, getContactDetails, updateContactDetails} = require("../controllers/contact");

// Add
router.route("/add").post(Auth, addContactDetails);

// Get
router.route("/list").get(Auth, getContactDetails);

// Update
router.route("/update").put(Auth, updateContactDetails);

module.exports = router