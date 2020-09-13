export interface PostsState {
    posts: IPost[];
    post?: IPost;
}

export const GET_POSTS = 'GET_POSTS';
export const GET_SINGLE_POST = 'GET_SINGLE_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const REACT = 'REACT';

interface GetPostsAction {
  type: typeof GET_POSTS;
  posts: IPost[];
}

interface GetSinglePostAction {
  type: typeof GET_SINGLE_POST;
  post: IPost;
}

interface AddCommentAction {
  type: typeof ADD_COMMENT;
  post: IPost;
}

interface ReactAction {
  type: typeof REACT,
  post: IPost
}

export type PostsActionTypes = GetPostsAction|GetSinglePostAction|AddCommentAction|ReactAction;

//multiple actions type would look like this
//export type ChatActionTypes = SendMessageAction | DeleteMessageAction