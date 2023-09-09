import express from "express";
import auth from "../middleware/auth.js";

import {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
} from "../controllers/blogPost.js";

const router = express.Router();

router.post("/create", createBlogPost);
router.get("/all", getAllBlogPosts);
router.get("/getbyid/:id", getBlogPostById);
router.patch("/updatebyid/:id", updateBlogPost);
router.delete("/deletebyid/:id", deleteBlogPost);

export default router;
