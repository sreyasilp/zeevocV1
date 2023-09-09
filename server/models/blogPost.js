import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  images: String,
  title: String,
  category: String
});

const BlogPost = mongoose.model('BlogPost', blogSchema);

export default BlogPost;
