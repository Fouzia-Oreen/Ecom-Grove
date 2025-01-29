// import express from "express";
// import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
// import createSubCategory, { updateSubCategory, removeSubCategory, listSubCategory,readSubCategory, } from "../controllers/subCategoryController.js";
// const router = express.Router()

// // create sub-category
// router.route("/").post(authenticate, authorizeAdmin, createSubCategory);

// // update sub-category
// router.route("/:subCategoryId").put(authenticate, authorizeAdmin, updateSubCategory);

// // delete sub-category
// router
//   .route("/:subCategoryId")
//   .delete(authenticate, authorizeAdmin, removeSubCategory);

// // list all sub-category
// router.route("/subcategories").get(listSubCategory);

// // read all category
// router.route("/:id").get(readSubCategory);

// export default router;