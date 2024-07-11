import express from "express";
import { adminAuth } from "../middleware/auth.js";

import {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
  getBlogByUrlKey,
  createMultipleBlogPosts,
  deleteAllBlogPosts
} from "../controllers/blogPost.js";

const router = express.Router();

router.post("/create", adminAuth, createBlogPost);
router.get("/all", getAllBlogPosts);
router.get("/getbyid/:id", getBlogPostById);
router.get("/:urlKey", getBlogByUrlKey);
router.patch("/updatebyid/:id", adminAuth, updateBlogPost);
router.delete("/deletebyid/:id", adminAuth, deleteBlogPost);
router.delete("/deleteall", adminAuth, deleteAllBlogPosts);
router.post('/createmultiple', createMultipleBlogPosts);

export default router;
