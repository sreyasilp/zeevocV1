import express from "express";
import auth from "../middleware/auth.js";

import {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/products.js";

const router = express.Router();

router.get("/all", getAllProducts);
router.get("/:id", getProductById);

router.post("/create", createProduct);
router.patch("/:id",  updateProduct);
router.delete("/deletebyid/:id", deleteProduct);

export default router;
