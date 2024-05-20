import express from "express";
import { adminAuth } from "../middleware/auth.js";

import {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
} from "../controllers/blogPost.js";

const router = express.Router();

router.post("/create", adminAuth, createBlogPost);
router.get("/all", getAllBlogPosts);
router.get("/getbyid/:id", getBlogPostById);
router.patch("/updatebyid/:id", adminAuth, updateBlogPost);
router.delete("/deletebyid/:id", adminAuth, deleteBlogPost);

export default router;
