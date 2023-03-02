import { Router } from "express";
import * as authController from "./controller/auth.controller.js";
const router = Router();

// 01- Sign Up (Post)---> Body
router.post("/sign-up", authController.signUp);
// 02- Sign In (Post)---> Body
router.post("/sign-in", authController.signIn);

export default router;
