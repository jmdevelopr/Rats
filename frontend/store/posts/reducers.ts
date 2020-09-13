import { PostsState, GET_POSTS, GET_SINGLE_POST, ADD_COMMENT, REACT, PostsActionTypes } from './types';

const initialState: PostsState = {
    posts: []
}

export const postsReducer = (state = initialState, action: PostsActionTypes): PostsState => {
    switch (action.type) {
        case GET_POSTS:
            return Object.assign({}, state, {
                posts: action.posts
            })
        case GET_SINGLE_POST:
            return Object.assign({}, state, {
                post: action.post
            })
        case ADD_COMMENT:
            return Object.assign({}, state, {
                post: action.post
            })
        case REACT:
            return Object.assign({}, state, {
                post: action.post
            });
        default:
            return state
    }
}