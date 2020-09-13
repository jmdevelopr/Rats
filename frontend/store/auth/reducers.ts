import { AuthState, CREATE_USER, LOGIN_USER, LOGOUT_USER, CHANGE_PASSWORD, DELETE_ACC, CHECK_TOKEN, UPDATE_STATE_REACTION, AuthActionTypes } from './types';

const initialState: AuthState = {
}

export const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
        case CREATE_USER:
            if (action.data.id) 
                location.assign('/');
            return Object.assign({}, state, {
                data: action.data
            })
        case LOGIN_USER:
            if (action.data.id) 
                location.assign('/');
            return Object.assign({}, state, {
                data: action.data
            })
        case LOGOUT_USER:
            location.assign(action.data.redirect);
            return state;
        case CHANGE_PASSWORD:
            if (action.data.emailError) {
                const data = state.data;
                const newData = Object.assign({}, data, {
                    ...data, emailError: action.data.emailError
                })

                return Object.assign({}, state, {
                    data: newData
                })
            }
            return state;
        case DELETE_ACC:
            location.assign(action.redirect);
            return state;
        case CHECK_TOKEN:
            if (action.data.redirect) {
                if (location.pathname !== '/start' && location.pathname !== '/signup' && location.pathname !== '/login')
                    location.assign(action.data.redirect);
            }
            return Object.assign({}, state, {
                data: action.data
            })
        case UPDATE_STATE_REACTION:
            //@ts-ignore
            updateReaction(state.data, action.postID, action.reaction);
        default:
            return state
    }
}


const updateReaction = (data: IUser, postID: string, newReaction: string) => {
    const exist = data.reactions.find(react => react.id===postID);

    if (exist) {
        const index = data.reactions.indexOf(exist);
        data.reactions[index].reaction = newReaction;
    } 
    else {
        const reactionObj = {
            id: postID,
            reaction: newReaction
        }
        data.reactions.push(reactionObj);
    }

    return data;
}