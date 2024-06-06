const _ = require('lodash');

const dummyTest = (blogs) => {
  return 1
}

const totalLikes = (blogPosts) => {
  return blogPosts.reduce((total, post) => total + post.likes, 0);
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null; // Return null if the array is empty
  }

  // Find the maximum number of likes
  const maxLikes = Math.max(...blogs.map(blog => blog.likes));

  // Filter blogs with the maximum number of likes
  const blogsWithMaxLikes = blogs.filter(blog => blog.likes === maxLikes);

  // Randomly select one of the blogs with the maximum likes
  const randomIndex = Math.floor(Math.random() * blogsWithMaxLikes.length);
  const randomBlog = blogsWithMaxLikes[randomIndex];

  return {
    title: randomBlog.title,
    author: randomBlog.author,
    likes: randomBlog.likes
  };
};

const mostBlogs = (blogs) => {
  // Count the number of blogs for each author
  const blogCounts = _.countBy(blogs, 'author');

  // Find the author with the maximum number of blogs
  const topAuthor = _.maxBy(_.keys(blogCounts), author => blogCounts[author]);

  return {
    author: topAuthor,
    blogs: blogCounts[topAuthor]
  };
};

const mostLikes = (blogs) => {
  // Create an object to store the total likes for each author
  const authorLikes = {};

  // Iterate through the blogs array and calculate the total likes for each author
  blogs.forEach(blog => {
    if (authorLikes[blog.author]) {
      authorLikes[blog.author] += blog.likes;
    } else {
      authorLikes[blog.author] = blog.likes;
    }
  });

  // Find the author with the maximum number of likes
  const topAuthor = Object.keys(authorLikes).reduce((a, b) => authorLikes[a] > authorLikes[b] ? a : b);

  return {
    author: topAuthor,
    likes: authorLikes[topAuthor]
  };
};
module.exports = {
  dummyTest,
  totalLikes, 
  favoriteBlog,
  mostBlogs,
  mostLikes
}