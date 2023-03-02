import { Router } from "express";
import auth from "../../middleware/authMiddleWare.js";
import * as userController from "./controller/user.controller.js";
const router = Router();

// 01- Update User
router.patch("/update", auth, userController.updateUser);
// 02- Delete User
router.delete("/delete", auth, userController.deleteUser);
// 03- Get User Data
router.get("/home", auth, userController.getUserData);
// 04- Update Password
router.put("/password", auth, userController.updatePassword);
// 05- User Profile
router.get("/profile", auth, userController.profile);
// 06- Get All Users
router.get("/", userController.getAllUsers);

export default router;
