import { IUser  } from "../typings/user";

import { model, Schema, HookNextFunction } from "mongoose";
import isEmail from "validator/lib/isEmail";

import bcrypt from 'bcrypt';

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
      lowercase: true,
      validate: [isEmail, 'Please enter a valid email']
    },

    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [6, 'Minimum password length is 6 characters']
    },

    username: {
      type: String,
      required: [true, 'Please enter a username']
    },

    reactions: [
        {
          id: String,
          reaction: String,
        }
    ],

    preferences: [
      {
        type: Boolean
      }
    ]
  },
  { timestamps: true }
);


userSchema.pre<IUser>('save', async function(next: HookNextFunction) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  
  next();
});

export default model<IUser>("User", userSchema);