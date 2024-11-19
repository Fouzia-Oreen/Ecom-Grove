import express from "express";
import { getAllUsers, loginUser, logoutUser, registerUser , getCurrentUserProfile , updateCurrentProfile, deleteUserById, getuserById, uodateUserById} from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router()

// all routes by admin
// user & admin register, get all users by the admin
router
  .route("/")
  .post(registerUser)
  .get(authenticate, authorizeAdmin, getAllUsers);

// get the current profile & update it by admin
router
   .route("/profile")
   .get(authenticate, getCurrentUserProfile)
   .put(authenticate, updateCurrentProfile)

// delete user, get user by id, update user by id by admin
router
    .route('/:id')
    .delete(authenticate, authorizeAdmin , deleteUserById)
    .get(authenticate, authorizeAdmin , getuserById)
    .put(authenticate, authorizeAdmin , uodateUserById)

// common routes
// login 
router.post(("/login"), loginUser);

// logout 
router.post(("/logout"), logoutUser);

export default router;