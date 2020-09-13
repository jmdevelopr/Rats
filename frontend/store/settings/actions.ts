import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { TOGGLE_NAME_DISPLAY, TOGGLE_DARK_MODE, SettingsActionTypes } from './types'

// TypeScript infers that this function is returning UpdateSessionAction
// would work the same in case SystemActionTypes represents a type of multiple actions

// newSession has type of an SystemState, it can be anything, its not linked with reducer types, its just an action argument

export const toggleNameDisplay = (id: string, preferences: IPreferences): ThunkAction<void, any, unknown, Action> => async dispatch => {
  const data = {id, nameDisplay: preferences.nameDisplay, darkMode: preferences.darkMode}
  await fetch('/api/settings/changenamedisplay', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
  }).then(res => res.json());
  dispatch({
        type: TOGGLE_NAME_DISPLAY,
        nameDisplay: !preferences.nameDisplay
  })
}

export const toggleDarkMode = (id: string, preferences: IPreferences): ThunkAction<void, any, unknown, Action> => async dispatch => {
  const data = {id, nameDisplay: preferences.nameDisplay, darkMode: preferences.darkMode}
  await fetch('/api/settings/changedarkmode', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
  }).then(res => res.json());
  dispatch({
        type: TOGGLE_DARK_MODE,
        darkMode: !preferences.darkMode
  })
}