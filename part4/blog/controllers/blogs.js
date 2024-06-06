const jwt = require("jsonwebtoken");
const blogsRuter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

blogsRuter.get("/", async (req, res) => {
  const token = req.token;

  const blogs = await Blog.find({}).populate("user", { userName: 1, name: 1 });
  res.json(blogs);
});

blogsRuter.post("/", async (req, res) => {
  const { title, author, url, likes } = req.body;

  // const user = request.user;

  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);

  if (!title || !url) {
    return res.status(400).json({ error: "Title and URL are required" });
  }

  const blog = new Blog({
    title,
    author,
    url,
    user: user.id,
    likes: likes || 0, // Default to 0 if likes is not provided
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  res.status(201).json(savedBlog); // Ensure the status code is 201
});

blogsRuter.delete("/:id", async (req, res) => {
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);
  const blog = await Blog.findById(req.params.id);
  if (blog.user._id.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
  }
});

module.exports = blogsRuter;
