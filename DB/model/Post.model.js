import { Schema, model, Types } from "mongoose";
const postSchema = new Schema(
  {
    caption: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default: "/images/test",
    },
    topics: {
      type: String,
    },
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const postModel = model("Post", postSchema);
export default postModel;
