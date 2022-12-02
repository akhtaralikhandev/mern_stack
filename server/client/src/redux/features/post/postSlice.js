import { createSlice } from "@reduxjs/toolkit";
import { API } from "../../../api";

const initialState = {
  post: [],
  comments: [],
  likes: [],
  num: 0,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: {
      reducer(state, action) {
        state.post.push(action.payload);
      },
    },
    fetchAllPosts: {
      reducer(state, action) {
        state.post.concat(action.payload);
      },
    },
    deletePost: {
      reducer(state, action) {
        state.post = state.post.filter((x) => x._id != action.payload);
      },
    },
    add: {
      reducer(state, action) {
        state.num += action.payload;
      },
    },
    addComment: {
      reducer(state, action) {
        state.comments.push(action.payload);
      },
    },
    addLike: {
      reducer(state, action) {
        state.likes.push(action.payload);
      },
    },
    fetchAllComments: {
      reducer(state, action) {
        state.comments.concat(action.payload);
      },
    },
  },
});
export const {
  addPost,
  fetchAllPosts,
  deletePost,
  add,
  fetchAllComments,
  addLike,
} = postSlice.actions;
export default postSlice.reducer;
