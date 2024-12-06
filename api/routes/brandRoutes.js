import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import createBrand, { listBrand, readBrand, removeBrand, updateBrand } from "../controllers/brandController.js";
const router = express.Router()

// create category
router.route("/").post(authenticate, authorizeAdmin, createBrand);

// update category
router.route("/:brandId").put(authenticate, authorizeAdmin, updateBrand);

// delete category
router
  .route("/:brandId")
  .delete(authenticate, authorizeAdmin, removeBrand);

// list all category
router.route("/brands").get(listBrand);

// read all category
router.route("/:id").get(readBrand);

export default router;