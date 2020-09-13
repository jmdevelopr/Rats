import { IPost } from "../typings/post";
import { model, Schema } from "mongoose";

const postSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    reactions: {
      type: [
        {
          name: String,
          count: Number
        }
      ],
      required: true,
    },

    comments: {
      type: [
        {
          author: String,
          comment: String
        }
      ],
      required: true,
    }
  },
  { timestamps: true }
);

export default model<IPost>("Post", postSchema);