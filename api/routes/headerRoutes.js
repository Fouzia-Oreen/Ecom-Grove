import express from "express";
import formidable from "express-formidable";
const router = express.Router();

// controllers
import { addHeader, fetchAllHeader, fetchHeaderById, removeHeader, updateHeader } from "../controllers/headerController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";


router
  .route("/")
  .get(fetchAllHeader)
  .post(authenticate, authorizeAdmin, formidable(), addHeader);

router
  .route("/:id")
  .get(fetchHeaderById)
  .put(authenticate, authorizeAdmin, formidable(), updateHeader)
  .delete(authenticate, authorizeAdmin, removeHeader);


export default router;