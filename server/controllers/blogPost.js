import BlogPost from "../models/blogPost.js";


// Create a new blog post
export const createBlogPost = async (req, res) => {
  try {
    const newBlogPost = new BlogPost(req.body);
    const savedBlogPost = await newBlogPost.save();
    res.status(201).json(savedBlogPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve all blog posts
export const getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();
    res.status(200).json(blogPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve a single blog post by its ID
export const getBlogPostById = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json(blogPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a blog post by its ID
export const updateBlogPost = async (req, res) => {
  try {
    const blogPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json(blogPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a blog post by its ID
export const deleteBlogPost = async (req, res) => {
  try {
    const blogPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBlogByUrlKey = async (req, res) => {
  try {
    const blogPost = await BlogPost.findOne({ urlKey: req.params.urlKey });
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json(blogPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create multiple blog posts
export const createMultipleBlogPosts = async (req, res) => {
  try {
    const blogPosts = req.body; // Assuming an array of blog post objects is sent in the request body
    const savedBlogPosts = await BlogPost.insertMany(blogPosts);
    res.status(201).json(savedBlogPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Function to delete all blog posts
export const deleteAllBlogPosts = async (req, res) => {
  try {
    await BlogPost.deleteMany({});
    res.status(204).json({ message: "All blog posts have been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};