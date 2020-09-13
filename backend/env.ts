import dotenv from 'dotenv';
import dotenvParseVariables from "dotenv-parse-variables";

let env: IEnv = dotenv.config({});
if (env.error) throw env.error;
env = dotenvParseVariables(env.parsed);

interface IEnv extends dotenv.DotenvConfigOutput {
    MONGO_USER?: string;
    MONGO_PASS?: string;
    MONGO_DB?: string;
    TIME_TO_LIVE?: number;
    PORT?: number;
    TOKEN?: string;
}

export default env;