import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { CREATE_USER, LOGIN_USER, LOGOUT_USER, CHANGE_PASSWORD, DELETE_ACC,CHECK_TOKEN } from './types'
import { LOAD_PREFERENCES } from '../settings/types';

// TypeScript infers that this function is returning UpdateSessionAction
// would work the same in case SystemActionTypes represents a type of multiple actions

// newSession has type of an SystemState, it can be anything, its not linked with reducer types, its just an action argument

export const createUser = (userData: IUser): ThunkAction<void, any, unknown, Action> => async dispatch => {
    const data = await fetch('/Rats/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    }).then(res => res.json());
    dispatch({
          type: CREATE_USER,
          data
    });
}

export const logInUser = (userData: IUser): ThunkAction<void, any, unknown, Action> => async dispatch => {
  const data = await fetch('/Rats/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
  }).then(res => res.json());
  dispatch({
        type: LOGIN_USER,
        data
  })
}

export const logOutUser = (): ThunkAction<void, any, unknown, Action> => async dispatch => {
    const data = await fetch('/Rats/api/auth/logout').then(res => res.json());
    dispatch({
          type: LOGOUT_USER,
          data
    })
}

export const changePassword = (id: string, currentPass: string, newPass: string): ThunkAction<void, any, unknown, Action> => async dispatch => {
      const data = await fetch('/Rats/api/auth/changepass', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({userID: id, currentPass, newPass})
      }).then(res => res.json());
      
      dispatch({
            type: CHANGE_PASSWORD,
            data
      })
}

export const deleteAcc = (id: string): ThunkAction<void, any, unknown, Action> => async dispatch => {
      const redirect = await fetch('/Rats/api/auth/deleteacc', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({userID: id})
      }).then(res => res.json());

      dispatch({
            type: DELETE_ACC,
            redirect
      })
}

export const checkToken = (): ThunkAction<void, any, unknown, Action> => async dispatch => {
  const data = await fetch('/Rats/api/auth/token').then(res => res.json());
  if(data.preferences)
      dispatch({
            type: LOAD_PREFERENCES,
            preferences: data.preferences
      })
  dispatch({
        type: CHECK_TOKEN,
        data
  });
}