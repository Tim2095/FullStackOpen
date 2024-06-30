import { useState } from "react";

const AddBlog = ({ onAddBlog, blogMsg }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const submitBlog = (e) => {
    e.preventDefault();
    onAddBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      {blogMsg !== null && <p>{blogMsg.message}</p>}
      <form onSubmit={submitBlog}>
        <div>
          <label>title</label>
          <input onChange={(e) => setTitle(e.target.value)} value={title} />
        </div>
        <label>author</label>
        <input onChange={(e) => setAuthor(e.target.value)} value={author} />
        <div>
          <label>url</label>
          <input onChange={(e) => setUrl(e.target.value)} value={url} />
        </div>
        <button>Add</button>
      </form>
    </div>
  );
};

export default AddBlog;
