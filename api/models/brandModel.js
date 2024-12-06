import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxLength: 32,
    unique: true,
  },
});

export default mongoose.model("Brand", brandSchema);