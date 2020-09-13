import { Document } from "mongoose";

export interface IUser extends Document {
    email: string;
    password: string;
    username: string;
    preferences: Array<boolean>,
    reactions: [
        {
            _id?: string;
            id: string;
            reaction: string;
        }
    ]
};

export interface IError extends Document {
    message: string;
    code?: number;
}