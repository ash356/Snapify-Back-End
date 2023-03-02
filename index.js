// To Run env File
import dotenv from "dotenv";
// To Load env File
dotenv.config();

import express from "express";
import initApp from "./src/app.router.js";
const app = express();
const port = process.env.PORT;

initApp(app, express);
app.listen(port, () => {
  console.log(`Server Is Runing.....Port: ${port}`);
});
