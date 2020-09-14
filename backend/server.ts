import express from "express";
import { Application, Request, Response, NextFunction } from "express";

import path from "path";
import webpack from "webpack"; 
import config from "../webpack.config";

import cors from 'cors';
import mongoose from 'mongoose';

import cookieParser from "cookie-parser";

import postRoutes from './routes/index';
import { verifyJWT } from './middleware/authMiddleware';

import env from "./env";

const compiler = webpack(config);  
const app: Application = express();

//app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(postRoutes);
app.use(express.static('../dist'));

const dbURI = `mongodb+srv://${env.MONGO_USER}:${env.MONGO_PASS}@ratsdb.nhfz4.mongodb.net/${env.MONGO_DB}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set("useFindAndModify", false);
mongoose.set('useCreateIndex', true);

app.use(require('webpack-dev-middleware')(compiler, {  
    noInfo: true,  
    publicPath: config.output.publicPath  
})); 

//app.use(function(req, res, next) {verifyJWT(req, res, next)})

app.get('/*', (req: Request, res: Response) => {
    const xd = "xd"
    res.sendFile(path.join(__dirname, '..', '/index.html'))
})

app.get('/api', (req: Request, res: Response) => {  
    res.send('<p>This is a api Data</p>');  
});  

mongoose.connect(dbURI, options)
    .then(() => {
        app.listen(env.PORT, () => console.log("Application running on port: "+env.PORT))
    })
    .catch(error => { throw error })
