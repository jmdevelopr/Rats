import { Response, Request } from "express";
import { Model } from "mongoose";
import { IUser, IError } from "../typings/user";
import User from "../models/user";

import jwt from 'jsonwebtoken';
import env from '../env';

import bcrypt from 'bcrypt';

const errorHandler = (err: IError) => {
  let userErrors = { username: "", email: "", password: "" };

  if (err.message === "Incorrect email")
    userErrors.email = "Incorrect email";

  if (err.message === "Incorrect password")
    userErrors.password = "Incorrect password";

  if (err.code === 11000) {
    userErrors.email = "That email is already registered";
    return userErrors;
  }

  if (err.message.includes("User validation failed")) {
    if (err.errors.username)
      userErrors.username = err.errors.username.properties.message;
    if (err.errors.email)
      userErrors.email = err.errors.email.properties.message;
    if (err.errors.password)
      userErrors.password = err.errors.password.properties.message;
  }

  return userErrors;
}

const createToken = (id: string) => {
  return jwt.sign({ id }, env.TOKEN, { expiresIn: env.TIME_TO_LIVE/1000 })
}

//typescript doesnt read the statics functions on the interface - bug
const login = async (email: string, password: string, userModel: Model<IUser,{}>) => {
  const user = await userModel.findOne({ email });


  const verifyPass = await bcrypt.compare(password, user.password);
  console.log(verifyPass);


  if (user) {
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (verifyPassword)
      return user;
    throw Error('Incorrect password');
  }
  throw Error('Incorrect email');
}

const createUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password, username } = req.body;
    const preferences = [true, false];
    try {
      const user = await User.create({ email, password, username, preferences, reactions: [] });
      const token = createToken(user._id);
      res.cookie('jwt', token, { maxAge: env.TIME_TO_LIVE, httpOnly: true })
      res.status(201).json({id: user._id});
    } catch (err) {
      const errors = errorHandler(err);
      res.status(400).json({ emailError: errors.email, passwordError: errors.password });
    }
};

const logInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await login(email, password, User);
    const token = createToken(user._id);
    res.cookie('jwt', token, { maxAge: env.TIME_TO_LIVE, httpOnly: true })
    res.status(200).json({ id: user._id, email: user.email, /*username: user.username*/ })
  } catch (err) {
    const errors = errorHandler(err);
    res.status(400).json({ emailError: errors.email, passwordError: errors.password });
  }
};

const logOutUser = (req: Request, res: Response) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.status(200).json({ redirect: "/start" })
};

const changePassword = async (req: Request, res: Response) => {
  const { userID, currentPass, newPass } = req.body;

  try {
    const user = await User.findById(userID);
    const verify = await bcrypt.compare(currentPass, user.password);
    
    if (verify) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash(newPass, salt);

      await User.findByIdAndUpdate(userID, { password });

      res.status(200).json({});
    }
    else {
      throw Error("Error")
    }
  } 
  catch (err) {
    res.status(400).json({ emailError: "Current password doesnt match" });
  }
};

const authCheck = async (req: Request, res: Response) => {
  try {
    if (res.locals.token) {
      const user = await User.findById(res.locals.token.id);
      res.status(200).json({ id: user._id, email: user.email, username: user.username, preferences: user.preferences, reactions: user.reactions })
    }
    else 
      res.status(200).json({ redirect: "/start" })
  } catch (err) {
    res.status(400).json({ err });
  }
}

export { createUser, logInUser, logOutUser, changePassword, authCheck };