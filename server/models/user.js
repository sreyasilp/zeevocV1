import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  sex: { type: String },
  address_line_one: { type: String },
  address_line_two: { type: String },
  city: { type: String },
  country: { type: String }, 
  pincode: { type: String }, 
  profileImage:  { type: String }
});

export default mongoose.model("User", userSchema);
