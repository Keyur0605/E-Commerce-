const express = require("express");
const router = express.Router();
const Auth = require("../middleware/auth");
const {addPolicy, getPolicyList, updatePolicy, deletePolicy} = require("../controllers/policy");

// Add
router.route("/add").post(Auth, addPolicy);

// Get
router.route("/list").get(getPolicyList);

// Update
router.route("/update").patch(Auth, updatePolicy);

// Delete
router.route("/delete/:id").delete(Auth, deletePolicy);

module.exports = router