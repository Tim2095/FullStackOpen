const { test, after, beforeEach } = require("node:test");
const supertest = require("supertest");
const mongoose = require("mongoose");
const assert = require("assert");
const Blog = require("../models/blog");
const app = require("../app");
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const initialBlog = new Blog({
    title: "Test Blog",
    author: "Test Author",
    url: "http://testurl.com",
    likes: 0,
  });
  await initialBlog.save();
});

test('likes property defaults to 0 if missing from the request', async () => {
  const newBlog = {
    title: 'New Blog Post Without Likes',
    author: 'New Author',
    url: 'http://newurl.com'
  };

  // Make POST request to create new blog without likes property
  const response = await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/);

  const createdBlog = response.body;

  // Verify the likes property defaults to 0
  assert.strictEqual(createdBlog.likes, 0, 'Likes property should default to 0');
});

test('successfully creates a new blog post with a POST request', async () => {
  // Get initial blogs
  const initialResponse = await api.get('/api/blogs');
  const initialBlogs = initialResponse.body;

  const newBlog = {
    title: 'New Blog Post',
    author: 'New Author',
    url: 'http://newurl.com',
    likes: 5
  };

  // Make POST request to create new blog
  await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/);

  // Get blogs after POST request
  const responseAfterPost = await api.get('/api/blogs');
  const blogsAfterPost = responseAfterPost.body;

  // Check that the number of blogs increased by one
  assert.strictEqual(blogsAfterPost.length, initialBlogs.length + 1);

  // Verify the content of the new blog post
  const createdBlog = blogsAfterPost.find(blog => blog.title === newBlog.title);
  assert(createdBlog, 'New blog post not found');
  assert.strictEqual(createdBlog.author, newBlog.author);
  assert.strictEqual(createdBlog.url, newBlog.url);
  assert.strictEqual(createdBlog.likes, newBlog.likes);
});

test('responds with status code 400 if title is missing', async () => {
  const newBlog = {
    author: 'New Author',
    url: 'http://newurl.com',
    likes: 5
  };

  await api.post('/api/blogs').send(newBlog).expect(400).expect('Content-Type', /application\/json/);
});

test('responds with status code 400 if url is missing', async () => {
  const newBlog = {
    title: 'New Blog Post',
    author: 'New Author',
    likes: 5
  };

  await api.post('/api/blogs').send(newBlog).expect(400).expect('Content-Type', /application\/json/);
});

test("unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  const blogs = response.body;

  assert(blogs, "Blogs are not defined");
  assert(blogs.length > 0, "No blogs found");

  blogs.forEach((blog) => {
    assert(blog.id, "Blog id is not defined");
    assert.strictEqual(blog._id, undefined, "Blog _id should be undefined");
  });
});

test("notes are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

after(async () => {
  await mongoose.connection.close();
});
