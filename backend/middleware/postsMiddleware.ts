import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import { IUser } from '../typings/user';

export const reactUser = async (req: Request, res: Response, next: NextFunction) => {
    const { postID, reactionName, userID } = req.body;

    const newReaction = {
        id: postID,
        reaction: reactionName
    };

    await User.findById(userID).then(async (user: IUser) => {
        const exist = user.reactions.find(react => react.id===postID);

        if (exist) {
            const index = user.reactions.indexOf(exist);
            res.app.locals.oldReaction = user.reactions[index].reaction;

            user.reactions[index] = newReaction;
        } 
        else
            user.reactions.push(newReaction);

        await user.save();
    });

    next();
}