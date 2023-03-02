import authRouter from "./modules/authModule/auth.router.js";
import userRouter from "./modules/userModule/user.router.js";
import postRouter from "./modules/postModule/post.router.js";
import connectDB from "../DB/connection.js";
import cors from "cors";
const initApp = (app, express) => {
  // Conver Buffer Data
  app.use(express.json({}));
  // To Allow Front End Request
  app.use(cors());
  //   Home Page
  app.get("/", (req, res) => {
    res.json({ message: "Home Page" });
  });
  //   Auth Router
  app.use("/auth", authRouter);
  //   User Router
  app.use("/user", userRouter);
  //   Note Router
  app.use("/post", postRouter);
  //   To Handel Routes Error
  app.use("*", (req, res) => {
    res.json({ message: "Error 404 Page Not Found !" });
  });
  // DB connection
  connectDB();
};

export default initApp;
