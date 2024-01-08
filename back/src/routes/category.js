const express = require("express");
const router = express.Router();
const Auth = require("../middleware/auth");
const { addMainCategory, addCategory, addSubCategory, mainCategoryList, categoryList, subCategoryList, categoryListById, subCategoryListById, categoryAndSubcategoryListById, updateMainCategory, updateCategory, updateSubCategory, deleteMainCategory, deleteCategory, deleteSubCategory } = require("../controllers/category");

// Add
router.route("/main/add").post(Auth, addMainCategory);
router.route("/add").post(Auth, addCategory);
router.route("/sub/add").post(Auth, addSubCategory);

// Get
router.route("/main/list").get(mainCategoryList);
router.route("/list").get(categoryList);
router.route("/sub/list/:number").get(subCategoryList);
router.route("/list/:mid").get(categoryListById);
router.route("/sub/list/:mid/:cid").get(subCategoryListById);
router.route("/:mid").get(categoryAndSubcategoryListById);

// Update
router.route("/main/update").patch(Auth, updateMainCategory);
router.route("/update").patch(Auth, updateCategory);
router.route("/sub/update").patch(Auth, updateSubCategory);

// Delete
router.route("/main/delete/:id").delete(Auth, deleteMainCategory);
router.route("/delete/:id").delete(Auth, deleteCategory);
router.route("/sub/delete/:id").delete(Auth, deleteSubCategory);

module.exports = router