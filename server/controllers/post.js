import mongoose from "mongoose";
import postModel from "../models/post.js";
export const getPostsByCreator = async (req, res) => {
  const { name } = req.query;
  try {
    const posts = await postModel.find({ name });

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getPosts = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await postModel.countDocuments({});
    const posts = await postModel
      .find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await postModel.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new postModel({
    ...post,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id ${id}`);
  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
  await postModel.findByIdAndUpdate(id, updatedPost, { new: true });
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Post with id : ${id}`);
  await postModel.findByIdAndRemove(id);
  const posts = await postModel.find({});

  res.json(posts);
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (!userId) {
    return res.json({ message: "Unauthenticated" });
  }
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Post with id : ${id}`);
  const post = await postModel.findById(id);
  const index = post.likes.findIndex((id) => id === String(userId));
  if (index === -1) {
    post.likes.push(userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(userId));
  }
  const updatedPost = await postModel.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.status(200).json(updatedPost);
};

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;
  const post = await postModel.findById(id);
  post.comments.push(value);
  const updatedPost = await postModel.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.json(updatedPost);
};
