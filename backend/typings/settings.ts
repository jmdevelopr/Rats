import { Document } from "mongoose";

export interface IPreferences extends Document {
    nameDisplay: boolean;
    darkMode: boolean;
};