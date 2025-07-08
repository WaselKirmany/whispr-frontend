import "./create.scss";
import { useState } from "react";
import { makeRequest } from "../../axios";

const Create = () => {
    console.log("Create component rendered");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting post:", { title, description });

    try {
      await makeRequest.post("/posts", {
        title,
        description,
      });
      alert("Post created successfully!");
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create post. Are you logged in?");
    }
  };

  const handleDiscard = () => {
    console.log("Discarding post creation");
    setTitle("");
    setDescription("");
  };

  return (
    <div className="create">
      <span>Create Post</span>
      <form onSubmit={handleSubmit} className="form">
        <div className="title">
          Title:
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="body">
          Description:
          <textarea
            placeholder="Body"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="buttons">
          <button type="submit" onClick={handleSubmit}>Submit</button>
          <button type="button" onClick={handleDiscard}>
            Discard
          </button>
        </div>
        </form>
    </div>
  );
};

export default Create;
