const { mostBlogs } = require('../utils/list_helper'); // Import the function to be tested

const test = (description, callback) => {
  console.log(`Test: ${description}`);
  callback();
};

const describe = (description, tests) => {
  console.log(`\n${description}`);
  tests();
};

const assertDeepEqual = (actual, expected) => {
  const actualStr = JSON.stringify(actual);
  const expectedStr = JSON.stringify(expected);

  if (actualStr === expectedStr) {
    console.log("Test passed!");
  } else {
    console.error(`Test failed! Expected ${expectedStr}, but got ${actualStr}`);
  }
};

describe('mostBlogs', () => {
  test('should return the author with the most blogs and the number of blogs', () => {
    const blogs = [
      { title: "Clean Code", author: "Robert C. Martin" },
      { title: "Refactoring", author: "Martin Fowler" },
      { title: "The Clean Coder", author: "Robert C. Martin" },
      { title: "Extreme Programming Explained", author: "Kent Beck" },
      { title: "Test Driven Development", author: "Kent Beck" },
      { title: "Design Patterns", author: "Martin Fowler" }
    ];

    const result = mostBlogs(blogs);

    // Define the expected result
    const expectedResult = {
      author: "Robert C. Martin",
      blogs: 2
    };

    // Check if the result matches the expected result
    assertDeepEqual(result, expectedResult);
  });

  // Add more test cases if needed
});
