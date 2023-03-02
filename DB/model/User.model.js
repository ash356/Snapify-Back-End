import { Schema, model } from "mongoose";
import postModel from "./Post.model.js";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: Number,
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      default: "Male",
      enum: ["Male", "Female"],
    },
    phone: {
      type: String,
      default: "(+20)123456789",
    },
  },
  {
    timestamps: true,
  }
);

var userModel = model("User", userSchema);
export default userModel;
