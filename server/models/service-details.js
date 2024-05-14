import mongoose from "mongoose";

// Define the schema for service details
const serviceDetailSchema = new mongoose.Schema({
  title: String,
  description: String,
  paragraph1: String,
  image1: String,
  paragraph2: String,
  image2: String,
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Services'
  }
});

const ServiceDetail = mongoose.model('ServiceDetail', serviceDetailSchema);

export default ServiceDetail;
