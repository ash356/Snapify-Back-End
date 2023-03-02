import { Router } from "express";
import * as postController from "./controller/post.controller.js";
import auth from "../../middleware/authMiddleWare.js";
const router = Router();
router.get("/", postController.getPostModule);
// 01- Add Post
router.post("/add", auth, postController.addPost);
// 02- Update Post
router.patch("/update", auth, postController.updatePost);
// 03- Delete Post
router.delete("/delete", auth, postController.deletePost);
// 04- Get All Posts With Owners
router.get("/allPosts", postController.getPostsWithUsers);
// 05- Get Post By Id
router.put("/:id", postController.getPostById);
// 06- Get Posts With One User
router.get("/posts", auth, postController.getPostsWithOwner);
export default router;
