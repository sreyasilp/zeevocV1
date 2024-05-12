import mongoose from "mongoose";

const extensionsSchema = new mongoose.Schema({
  image: String,
  category: String,
  title: String,
  bigImage: String
});

const Extensions = mongoose.model('Extensions', extensionsSchema);

export default Extensions;
