import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import AddBlog from "./components/AddBlog";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [blogAddMessage, setBlogAddMessage] = useState(null);
  const formRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loggedUser = await loginService.login({ username, password });
      window.localStorage.setItem("loggedappUser", JSON.stringify(loggedUser));
      setUser(loggedUser);

      blogService.setToken(loggedUser.token);

      setUsername("");
      setPassword("");
    } catch (err) {
      setErrorMessage(err || "An error occurred during login");
      console.log(err);
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedappUser");
    setUser(null);
  };

  const handleAddBlog = async (blog) => {
    try {
      const newBlog = await blogService.addNewBlog(blog);
      setBlogs((prev) => {
        return prev.concat(newBlog);
      });
      setBlogAddMessage({
        message: `A new blog ${newBlog.title}! by ${newBlog.author} added`,
      });

      formRef.current.toggleVisibility();

      setTimeout(() => {
        setBlogAddMessage(null);
      }, 5000);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleBlogUpdate = (updatedBlog) => {
    setBlogs((prevBlogs) => {
      return prevBlogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
    });
  };

  const deleteBlogHandler = (blogId) => {
    const updatedBlogs = blogs.filter(blog => blog.id !== blogId)
    setBlogs(updatedBlogs)
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <h2>blogs</h2>
      {user !== null && (
        <div>
          <div> {user.name} is logged In</div>
          <h3>Create new</h3>
          <Togglable ref={formRef}>
            <AddBlog onAddBlog={handleAddBlog} blogMsg={blogAddMessage} />
          </Togglable>
        </div>
      )}
      {/* {user !== null && blogs.map((blog) => <Blog key={blog.id} blog={blog} onBlogUpdate={handleBlogUpdate}/>)} */}

      {user !== null &&
        blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} onBlogUpdate={handleBlogUpdate} onBlogDelete={deleteBlogHandler} />
          ))}

      {user === null && (
        <div>
          {errorMessage.error && <h2>{errorMessage.error}</h2>}
          <form onSubmit={handleLogin}>
            <div>
              <label>username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button>Login</button>
            {user !== null && <button>Logout</button>}
          </form>
        </div>
      )}
      <div>
        {user !== null && <button onClick={handleLogout}>Logout</button>}
      </div>
    </div>
  );
};

export default App;
