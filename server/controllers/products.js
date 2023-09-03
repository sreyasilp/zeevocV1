import express from "express";
import ProductsModel from "../models/products.js";

const router = express.Router();

export const getProducts = async (req, res) => {
  const { page } = req.query;
  try {
    const limit = 8 ;
    const skipCount = (Number(page) - 1) * limit;
    const total = await ProductsModel.countDocuments({});
    const products = await ProductsModel.find()
      .sort({ _id: -1 })
      .limit(limit)
      .skip(skipCount);
    res.json({
      data: products,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductsModel.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await ProductsModel.findByIdAndRemove(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProductById = async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  try {
    const updatedProduct = await ProductsModel.findByIdAndUpdate(id, update, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getProductsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const name = new RegExp(searchQuery, "i");
    const tagsArray = tags.split(",");
    const products = await ProductsModel.find({
      $or: [{ name }, { tags: { $in: tagsArray } }],
    });
    res.json({ data: products });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getProductsBySeller = async (req, res) => {
  const { seller } = req.query;
  try {
    const products = await ProductsModel.find({ seller });
    res.json({ data: products });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addProduct = async (req, res) => {
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }
  const product = req.body;
  const newProduct = new ProductsModel({
    ...product,
    seller: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const addProductReviewById = async (req, res) => {
  const { id } = req.params;
  const { rating, comment, name } = req.body;

  try {
    const product = await ProductsModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const review = {
      name,
      rating: Number(rating),
      comment,
      createdAt: new Date().toISOString(),
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => acc + item.rating, 0) /
      product.numReviews;

    await product.save();

    res.status(201).json({ message: "Product review added", review });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default router;
