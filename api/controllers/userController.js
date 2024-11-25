import bcrypt from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// create or register user
const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if (!username || !email  || !password) {
        throw new Error("Please fill all  the inputs")
    }
    const userExists = await User.findOne({email})
    if (userExists) {
        res.status(400).send("user exist with this email")
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({username, email, password: hashedPassword});
    try {
        await newUser.save();
        generateToken(res, newUser._id)
        res
          .status(201)
          .json({
            _id : newUser._id, 
            username : newUser.username, 
            email : newUser.email, 
            isAdmin : newUser.isAdmin
        })

    } catch (error) {
        res.status(400)
        throw new Error("Invalid credintial data")
    }
})
// login or authorise user
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    if (!email  || !password) {
        throw new Error("Please fill all  the inputs")
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const isPasswordValid = await bcrypt.compare(
            password, 
            existingUser.password
        );
        if (isPasswordValid) {
            generateToken(res, existingUser._id)
            res.status(201).json({
              _id : existingUser._id, 
              username : existingUser.username, 
              email : existingUser.email, 
              isAdmin : existingUser.isAdmin
          })
          return
        }
        res.status(400).send("user exist with this email")
    }
});
// logout user
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', "", {
        httpOnly : true,
        expires : new Date(0),
    })
    res.status(201).json({
        success : true, message : "User successfully logout"
    })
})
// get all users
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});
// get current user
const getCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email
        })
    }else {
        res.status(400)
        throw new Error("User Not Found");
    }
})
// update current profile
const updateCurrentProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            user.password = hashedPassword;
        }
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    } else {
        res.status(400)
        throw new Error("User Not Found");
    }
})
// delete user by id
const deleteUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        if (user.isAdmin) {
            res.status(400)
            throw new Error("Cannot delete admin user");
        }
        await user.deleteOne({_id: user._id})
        res.json({message : "User removed"})
    }else {
        res.status(400)
        throw new Error("User Not Found");
    }

})
// get user by id
const getuserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if(user) {
      res.json(user)
    } else {
        res.status(400)
        throw new Error("User Not Found");
    }
})
// update user by id
const uodateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin );
        const updatedUser = await user.save()
        res.json({
            _id : updatedUser._id,
            username : updatedUser.username,
            email : updatedUser.email,
            isAdmin : updatedUser.isAdmin,
        })
      } else {
        res.status(400)
        throw new Error("User Not Found");
      }
})












export { registerUser , loginUser, logoutUser , deleteUserById, getAllUsers, getCurrentUserProfile, updateCurrentProfile, getuserById , uodateUserById};
