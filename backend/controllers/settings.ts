import { Response, Request } from "express";
import { Model } from "mongoose";
import { IPreferences } from "../typings/settings";
import User from "../models/user";

import jwt from 'jsonwebtoken';
import env from '../env';

const changeNameDisplay = async (req: Request, res: Response) => {
    const { id, nameDisplay, darkMode } = req.body;
    const preferences = [!nameDisplay, darkMode];
    try {
      const user = await User.findByIdAndUpdate(id, { preferences })
      res.status(201).json({ preferences: user.preferences });
    } catch (err) {
      res.status(400).json({ err });
    }
}

const changeDarkMode = async (req: Request, res: Response) => {
    const { id, nameDisplay, darkMode } = req.body;
    const preferences = [nameDisplay, !darkMode];
    try {
      const user = await User.findByIdAndUpdate(id, { preferences })
      res.status(201).json({ preferences: user.preferences });
    } catch (err) {
      res.status(400).json({ err });
    }
}

export { changeNameDisplay, changeDarkMode };