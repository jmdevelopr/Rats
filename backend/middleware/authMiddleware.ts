import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/user';

import env from '../env';

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const token  = req.cookies.jwt;
    if (token) {
        jwt.verify(token, env.TOKEN, (err: Error, decodedToken: any) => {
            if (err) {
                console.log(err)
            }
            else {
                res.locals.token = decodedToken;
            }
        });
    }
    next();
}

export const deleteAcc = async (req: Request, res: Response, next: NextFunction) => {
    const { userID } = req.body;
    try {
      await User.findByIdAndDelete(userID);
    } catch (err) {
      res.status(400).json({ err });
    }
    next();
};