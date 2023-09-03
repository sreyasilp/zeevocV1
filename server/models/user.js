import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: {
    type: String,
    enum: ["seller", "buyer", "admin"],
    required: true,
    default: "buyer",
  },
});

export default mongoose.model("User", userSchema);
