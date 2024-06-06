const favoriteBlog = require('../utils/list_helper').favoriteBlog; // Import the function to be tested

const test = (description, callback) => {
  console.log(`Test: ${description}`);
  try {
    callback();
    console.log("Test passed!");
  } catch (error) {
    console.error("Test failed!", error.message);
  }
};

const describe = (description, tests) => {
  console.log(`\n${description}`);
  tests();
};

describe('favoriteBlog', () => {
  test('should return one of the blogs with the most likes if there are multiple', () => {
    const blogs = [
      { title: "Clean Code", author: "Robert C. Martin", likes: 20 },
      { title: "Refactoring", author: "Martin Fowler", likes: 15 },
      { title: "The Clean Coder", author: "Robert C. Martin", likes: 20 },
      { title: "Extreme Programming Explained", author: "Kent Beck", likes: 18 }
    ];

    const result = favoriteBlog(blogs);

    // Check if the result is one of the blogs with the maximum likes
    const maxLikes = Math.max(...blogs.map(blog => blog.likes));
    const expectedBlogs = blogs.filter(blog => blog.likes === maxLikes).map(blog => blog.title);

    if (!expectedBlogs.includes(result.title)) {
      throw new Error(`Expected one of ${expectedBlogs}, but got ${result.title}`);
    }
  });
});
