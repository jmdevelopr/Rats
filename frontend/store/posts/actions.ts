import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { GET_POSTS, GET_SINGLE_POST, ADD_COMMENT, REACT } from './types'
import { UPDATE_STATE_REACTION } from '../auth/types';

// TypeScript infers that this function is returning UpdateSessionAction
// would work the same in case SystemActionTypes represents a type of multiple actions

// newSession has type of an SystemState, it can be anything, its not linked with reducer types, its just an action argument

export const getPosts = (): ThunkAction<void, any, unknown, Action> => async dispatch => {
  const posts = await fetch('/Rats/api/posts').then(res => res.json());
  dispatch({
        type: GET_POSTS,
        posts: posts.posts
  })
}

export const getSinglePost = (path: string): ThunkAction<void, any, unknown, Action> => async dispatch => {
  const post = await fetch(`/Rats/api/posts${path}`).then(res => res.json());
  dispatch({
        type: GET_SINGLE_POST,
        post: post.post
  })
}

export const addComment = (path: string, comment: IComment, nameDisplay: boolean): ThunkAction<void, any, unknown, Action> => async dispatch => {
  const data = {
    id: path,
    author: nameDisplay===false ? "Anonymous user" : comment.author,
    comment: comment.comment,
  };
  
  const post = await fetch(`/Rats/api/posts/${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json());

  dispatch({
        type: ADD_COMMENT,
        post: post.post
  })
}

export const reactAction = (path: string, reactionName: string, userID: string): ThunkAction<void, any, unknown, Action> => async dispatch => {
  const data = {
    postID: path,
    reactionName,
    userID,
  };
  
  const post = await fetch("/Rats/api/react", {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json());

  dispatch({
    type: UPDATE_STATE_REACTION,
    reaction: reactionName,
    postID: path
  });

  dispatch({
        type: REACT,
        post: post.post
  });

}