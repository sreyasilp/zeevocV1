import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: false },
  rating: { type: Number, required: false },
  comment: { type: String, required: false },
},{
  timestamps: true,
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  countInStock: { type: Number, required: true },
  image: { type: String, required: true },
  seller: { type: String, required: true },
  reviews: [reviewSchema],
  rating: { type: Number, required: false, default: 0 },
  numReviews: { type: Number, required: false, default: 0 },
},{
  timestamps: true,
});

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
