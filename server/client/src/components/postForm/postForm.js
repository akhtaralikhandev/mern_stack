import { useState } from "react";
import FileBase from "react-file-base64";
// import API from ".../api/index.js";
import "./postForm.css";
import { API } from "../../api";
import { add } from "../../redux/features/post/postSlice";
import { useDispatch } from "react-redux";
export const Postform2 = () => {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  console.log(`user is ${user}`);
  const Submit = async (e) => {
    e.preventDefault();
    if (title || message || selectedFile) {
      const response = await API.post("/post", {
        title: title,
        tag: tag,
        message: message,
        selectedFile: selectedFile,
        name: user?.result?.name,
        creator: user?.result?._id,
      });
      dispatch(add(1));
      setMessage("");
      setTag("");
      setTitle("");
      setSelectedFile("");
    }
  };
  return (
    <div className="post">
      <div className="postwrapper">
        <input
          type="text"
          placeholder="write title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="inputtitle"
        />
        <textarea
          name=""
          id=""
          cols="20"
          rows="8"
          placeholder="Write About"
          className="postTextArea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          type="text"
          value={tag}
          placeholder="write tag"
          onChange={(e) => setTag(e.target.value)}
          className="inputtag"
        />
        <div className="filebase64">
          <FileBase
            type="file"
            onDone={({ base64 }) => setSelectedFile(base64)}
          />
        </div>
        <button className="postsubmit" onClick={(e) => Submit(e)}>
          Submit
        </button>
      </div>
    </div>
  );
};
