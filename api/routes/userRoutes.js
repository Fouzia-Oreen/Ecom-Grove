import express from "express";
import { 
  getAllUsers, 
  loginUser, 
  logoutUser, 
  registerUser , 
  getCurrentUserProfile , 
  updateCurrentProfile, 
  deleteUserById, 
  getUserById, 
  updateUserById} from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router()

// user & admin register, get all users by the admin
router
  .route("/")
  .post(registerUser)
  .get(authenticate, authorizeAdmin, getAllUsers);

router.post(("/login"), loginUser);
router.post(("/logout"), logoutUser);

// get the current profile & update it by admin
router
   .route("/profile")
   .get(authenticate, getCurrentUserProfile)
   .put(authenticate, updateCurrentProfile)

// delete user, get user by id, update user by id by admin
router
    .route('/:id')
    .delete(authenticate, authorizeAdmin , deleteUserById)
    .get(authenticate, authorizeAdmin , getUserById)
    .put(authenticate, authorizeAdmin , updateUserById)


export default router;