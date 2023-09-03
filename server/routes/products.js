import express from "express";
import auth from "../middleware/auth.js";

import {
  getProducts,
  addProduct,
  getProductById,
  getProductsBySeller,
  getProductsBySearch,
  deleteProductById,
  updateProductById,
  addProductReviewById
} from "../controllers/products.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/seller", getProductsBySeller);
router.get("/search", getProductsBySearch);
router.get("/:id", getProductById);

router.post("/", auth, addProduct);
router.patch("/:id",  auth,updateProductById);
router.delete("/:id",auth, deleteProductById);
router.post("/:id/reviewProduct",auth, addProductReviewById);

export default router;
