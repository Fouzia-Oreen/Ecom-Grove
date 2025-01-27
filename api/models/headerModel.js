import mongoose from "mongoose";

const headerSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Header = mongoose.model("Header", headerSchema);
export default Header;
