import postModel from "../../../../DB/model/Post.model.js";
import userModel from "../../../../DB/model/User.model.js";

export const getPostModule = async (req, res) => {
  return res.redirect("post/allPosts");
};
// 01- Add Post
export const addPost = async (req, res) => {
  try {
    const { caption, topics } = req.body;
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.json({ message: "In-Valid User !" });
    }
    const post = await postModel.create({
      caption,
      topics,
      userId: req.user._id,
    });
    return res.json({ message: "Success", post });
  } catch (error) {
    return res.json({ message: "Error!", error, stack: error.stack });
  }
};
// 02- Update Post (id --> Params)
export const updatePost = async (req, res) => {
  try {
    const { id } = req.body;
    const post = await postModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (post == null) {
      return res.json({ message: "Post Not Found !" });
    }
    return res.json({ message: "Success", post });
  } catch (error) {
    if (error.path == "_id") {
      return res.json({ message: "In-Valid Post ID !" });
    }
    return res.json({ message: "Error!", error, stack: error.stack });
  }
};
// 03 Delete Post (id --> Params)
export const deletePost = async (req, res) => {
  try {
    const { id } = req.body;
    const post = await postModel.findByIdAndDelete(id);

    if (post == null) {
      return res.json({ message: "Post Not Found !" });
    }
    return res.json({ message: "Success", post });
  } catch (error) {
    if (error.path == "_id") {
      return res.json({ message: "In-Valid Post ID !" });
    }
    return res.json({ message: "Error!", error, stack: error.stack });
  }
};
// 04- Get All Posts With Owners
export const getPostsWithUsers = async (req, res) => {
  try {
    const post = await postModel
      .find({})
      .select("-__v -updatedAt")
      .populate({ path: "userId", select: "_id userName email gender" });
    return res.json({ message: "Success", post });
  } catch (error) {
    return res.json({ message: "Error!", error, stack: error.stack });
  }
};
// 05- Get Post By Id
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postModel.findById(id).select("-__v");
    if (post == null) {
      return res.json({ message: "Post Not Found !" });
    }
    return res.json({ message: "Success", post });
  } catch (error) {
    if (error.path == "_id") {
      return res.json({ message: "In-Valid Post ID !" });
    }
    return res.json({ message: "Error!", error, stack: error.stack });
  }
};
// 06- Get All Posts With One User
export const getPostsWithOwner = async (req, res) => {
  try {
    const posts = await postModel
      .find({ userId: req.user._id })
      .populate({ path: "userId", select: "_id userName email" });
    return res.json({ message: "Success", posts });
  } catch (error) {
    return res.json({ message: "Error", error });
  }
};
