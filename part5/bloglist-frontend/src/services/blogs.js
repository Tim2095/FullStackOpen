import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addNewBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const addLike = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, {
    likes: blog.likes + 1,
  });
  return response.data;
};

const deleteBlog = async (blogId) => {
  try {
    const response = await axios.delete(`${baseUrl}/${blogId}`);

    console.log("Blog deleted successfully");
    return response.data;
  } catch (error) {
    console.error("Error deleting the blog", error);
    throw error;
  }
};

export default { getAll, addNewBlog, setToken, addLike, deleteBlog };
