import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import createCategory, { listCategory, readCategory, removeCategory, updateCategory } from "../controllers/categoryController.js";
const router = express.Router()

// create category
router.route("/").post(authenticate, authorizeAdmin, createCategory);

// update category
router.route("/:categoryId").put(authenticate, authorizeAdmin, updateCategory);

// delete category
router
  .route("/:categoryId")
  .delete(authenticate, authorizeAdmin, removeCategory);

// list all category
router.route("/categories").get(listCategory);

// read all category
router.route("/:id").get(readCategory);

export default router;