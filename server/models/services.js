import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  title: String,
  description: String,
  paragraph_one: String,
  image_one: String,
  paragraph_two: String,
  image_two: String,
  videoId:String,
  url_key: String
});

const Services = mongoose.model('Services', serviceSchema);

export default Services;
