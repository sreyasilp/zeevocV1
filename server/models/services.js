import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  title: String,
  description: String
});

const Services = mongoose.model('Services', serviceSchema);

export default Services;
