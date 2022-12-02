import { API } from "../../api";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useSelector, useDispatch } from "react-redux";
import {
  add,
  deletePost,
  fetchAllPosts,
} from "../../redux/features/post/postSlice";
import "./post.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
const Posts = () => {
  const [error, setError] = useState([]);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.post);
  const comments = useSelector((state) => state.post.comments);
  const num = useSelector((state) => state.post.num);
  const [comment, setComment] = useState("");
  const [data, setData] = useState([posts]);
  const user2 = JSON.parse(localStorage.getItem("profile"));
  const profile = user2.result?.name;
  const url = "post";
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await API.get(url);
        dispatch(fetchAllPosts(response.data.data));
        console.log(response.data.data);
        setData(response.data.data);
      } catch (error) {
        setError(error);
        console.log(error);
      }
    };
    fetchPosts();
  }, [num]);

  const AddComment2 = async (id) => {
    // e.preventDefault()
    if (comment) {
      try {
        const resp = await API.post(`/post/${id}/commentPost`, {
          value: `${profile} : ${comment}`,
        });
        console.log(resp);
        setComment("");
        dispatch(add(1));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removePost = async (id) => {
    dispatch(deletePost(id));
    const resp = await API.delete(`/post/${id}`);
    setData(resp.data);
  };
  if (data) {
    return (
      <>
        {data?.map((x) => (
          <div className="postlist">
            <div className="postlistwrapper">
              <div className="toppost">
                <span className="postname">{x.name ? x.name : ""}</span>
                <span className="postcreatedAt">
                  {moment(x.createdAt).fromNow()}
                </span>
              </div>

              <div className="bottompost">
                <img className="postimage" src={x.selectedFile} alt="" />
              </div>
            </div>
            <div className="centerpost">
              <span className="postitle">{x.title ? x.title : ""}</span>
              <span className="postmessage">{x.message ? x.message : ""}</span>
            </div>
            <div className="likepost">
              <div className="likeposticon">
                Like <FavoriteBorderIcon />
              </div>
              <div className="deletepost" onClick={(id) => removePost(x._id)}>
                Delete <DeleteIcon />
              </div>
            </div>{" "}
            <div className="postComments">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="write comment"
                className="inputpostcomment"
              />
              <button
                className="submitpostcomment"
                onClick={() => AddComment2(x._id)}
              >
                Add
              </button>
            </div>
            <div className="commentslist">
              <span className="spancommentheading">comments</span>
              {x.comments?.map((y) => (
                <div className="commentsection">
                  <span className="commentspan">{y}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </>
    );
  } else {
    return (
      <div className="nopost">
        <div className="nopostwrapper">
          <span className="nopostspan">No post to show</span>
        </div>
      </div>
    );
  }
};

export default Posts;
