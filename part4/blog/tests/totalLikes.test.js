const { describe, test } = require("node:test");
const { totalLikes } = require("../utils/list_helper");
const assert = require('node:assert')

describe("blog with most likes", () => {
  const blogsWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  const blogsWithThreeBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f9",
      title: "React Patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f0",
      title: "Software Engineering 101",
      author: "John Doe",
      url: "https://example.com/",
      likes: 15,
      __v: 0,
    },
  ];

  test("when list has only one blog, returns that blog", () => {
    const result = totalLikes(blogsWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test("when list has multiple blogs, returns the one with the most likes", () => {
    const result = totalLikes(blogsWithThreeBlogs);
    assert.strictEqual(result, 30); // Total likes of all blogs
  });

  test("when list is empty, returns 0", () => {
    const result = totalLikes([]);
    assert.strictEqual(result, 0);
  });
});
