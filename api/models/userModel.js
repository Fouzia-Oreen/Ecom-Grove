import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    username : {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password : {type:String, required:true},
    address : String,
    state : String,
    city : String,
    zipCode : Number,
    phone : Number,
    isAdmin : {type:Boolean, required:true, default:false},
}, {timeStamps :true})
const User = mongoose.model("User", userSchema);
export default User;