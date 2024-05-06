import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  image: String,
  category: String,
  title: String,
});

const Products = mongoose.model('Products', productsSchema);

export default Products;
