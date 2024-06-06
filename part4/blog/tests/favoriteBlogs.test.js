// const { describe, test } = require("node:test");
// const assert = require('assert');
// const { favoriteBlog } = require('../utils/list_helper');

// describe('favoriteBlog', () => {
//   test('should return null if the array is empty', () => {
//     const result = favoriteBlog([]);
//     assert.strictEqual(result, null);
//   });

//   test('should return the blog with the most likes', () => {
//     const blogs = [
//       { title: "Canonical string reduction", author: "Edsger W. Dijkstra", likes: 12 },
//       { title: "The Two Pillars of JavaScript", author: "Eric Elliott", likes: 15 },
//       { title: "JavaScript: The Good Parts", author: "Douglas Crockford", likes: 10 },
//       { title: "JavaScript: The Definitive Guide", author: "David Flanagan", likes: 8 }
//     ];

//     const result = favoriteBlog(blogs);
//     const expectedResult = { title: "The Two Pillars of JavaScript", author: "Eric Elliott", likes: 15 };

//     assert.strictEqual(result.title, expectedResult.title);
//     assert.strictEqual(result.author, expectedResult.author);
//     assert.strictEqual(result.likes, expectedResult.likes);
//   });

//   test('should return one of the blogs with the most likes if there are multiple', () => {
//     const blogs = [
//       { title: "Clean Code", author: "Robert C. Martin", likes: 20 },
//       { title: "Refactoring", author: "Martin Fowler", likes: 15 },
//       { title: "The Clean Coder", author: "Robert C. Martin", likes: 20 },
//       { title: "Extreme Programming Explained", author: "Kent Beck", likes: 18 }
//     ];

//     const result = favoriteBlog(blogs);

//     // Check if the result is one of the expected blogs
//     assert.strictEqual(result.title, "Clean Code");
//     assert.strictEqual(result.likes, 20);
//   });
// });
