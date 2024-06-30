import { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from 'prop-types'

const Blog = ({ blog, onBlogUpdate, onBlogDelete }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const handleLikeUpdate = async () => {
    try {
      const updatedBlog = await blogService.addLike(blog);
      onBlogUpdate(updatedBlog);
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      const confirmDelete = confirm("Are you sure you want to delete?");
      if (confirmDelete) {
        await blogService.deleteBlog(blogId);
        onBlogDelete(blogId);
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ border: "1px solid black" }}>
      <div>{blog.title}</div>
      {detailsVisible && (
        <div>
          <p>{blog.author}</p>
          <p>{blog.url}</p>
          <p>
            likes: {blog.likes}
            <button onClick={handleLikeUpdate}>like</button>
          </p>
          <p>{blog.user.name}</p>
          <button onClick={() => handleDeleteBlog(blog.id)}>remove</button>
        </div>
      )}
      <button onClick={() => setDetailsVisible(!detailsVisible)}>
        {detailsVisible ? "hide" : "show"}
      </button>
    </div>
  );
};

Blog.propTypes = {
  onBlogDelete: PropTypes.func.isRequired,
  onBlogUpdate: PropTypes.func.isRequired,
};

export default Blog;
