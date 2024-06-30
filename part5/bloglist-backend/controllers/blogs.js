const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

blogRouter.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });

    res.json(blogs);
  } catch (err) {
    res.json(err);
  }
});

blogRouter.get(":/id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

const getTokenFromRequest = (req) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

blogRouter.post("/", async (req, res) => {
  try {
    const { title, author, url } = req.body;
    const decodedToken = jwt.verify(
      getTokenFromRequest(req),
      process.env.SECRET
    );

    if (!decodedToken.id) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      title,
      author,
      url,
      likes: 0,
      user: user.id,
    });

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(201).json(savedBlog);
  } catch (err) {
    res.json({
      error: err.message,
    });
  }
});

blogRouter.put("/:id", async (req, res) => {
  try {
    const updatedBlogLike = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updatedBlogLike,
      {
        new: true,
        runValidators: true,
      }
    ).populate("user");

    if (!updatedBlog) {
      console.log("Blog not updated: Blog not found");
      return res.status(404).send({ error: "Blog not found" });
    }

    res.json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(400).send({
      error: "An error occurred while updating the blog",
      details: error.message,
    });
  }
});

blogRouter.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  return res.json(204).end();
});

module.exports = blogRouter;
