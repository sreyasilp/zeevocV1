import mongoose from "mongoose";

const extensionsSchema = new mongoose.Schema({
  category: String,
  title: String,
  price: { type: Number },
  urlKey: String,
  imageName: String,
  thumbnail: String,
  contentHtml: String
});

const Extensions = mongoose.model('Extensions', extensionsSchema);

export default Extensions;
