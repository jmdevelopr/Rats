import { Document } from "mongoose";

export interface IPost extends Document {
    title: string;
    content: string;
    reactions: Array<{
        name: string;
        count: number;
    }>;
    comments: Array<{
        author: string;
        comment: string;
    }>;
};

