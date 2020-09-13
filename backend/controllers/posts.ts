import { Response, Request } from "express";
import { IPost } from "../typings/post";
import Post from "../models/post";

const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts: IPost[] = await Post.find();
    res.status(200).json({ posts });
  } catch (error) {
    throw error;
  }
};

const getSinglePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post: IPost = await Post.findById(req.params.id);
    res.status(200).json({ post });
  } catch (error) {
    throw error;
  }
};

const addComment = async (req: Request, res: Response): Promise<void> => {
  const { author, comment } = req.body;
  const newComment = {author, comment};

  try {
    const post: IPost = await Post.findById(req.params.id).then(async (post: IPost) => {
      try {
        post.comments = [...post.comments, newComment];
        await post.save();
        return post;
      }
      catch(err) {
        console.log(err);
      }
    });
    res.status(200).json({ post });
  } catch (error) {
    throw error;
  }
};

const reactPost = async (req: Request, res: Response): Promise<void> => {
  const { postID, reactionName } = req.body;

  try {
    const post: IPost = await Post.findById(postID).then(async (post: IPost) => {
      const reacts = post.reactions;

      const oldReactionIndex = reacts.indexOf(reacts.find(react => react.name===res.app.locals.oldReaction))
      const reactionIndex = reacts.indexOf(reacts.find(react => react.name===reactionName));

      if (oldReactionIndex > -1)
        post.reactions[oldReactionIndex].count-=1;

      post.reactions[reactionIndex].count+=1;

      await post.save();
      return post;
    });
    res.status(200).json({ post });
  } catch (error) {
    throw error;
  }
};

export { getPosts, getSinglePost, addComment, reactPost };