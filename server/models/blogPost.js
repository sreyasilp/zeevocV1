import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  images: String,
  title: String,
  category: String,
  html_content: String,
  author: String,
  urlKey: String,
  comments_count: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  meta_title: String,
  meta_description: String
});

const BlogPost = mongoose.model('BlogPost', blogSchema);

export default BlogPost;
