import { SettingsState, SettingsActionTypes, LOAD_PREFERENCES, TOGGLE_NAME_DISPLAY, TOGGLE_DARK_MODE } from './types'

const initialState: SettingsState = {
  nameDisplay: false,
  darkMode: false
}

export const settingsReducer = (state = initialState, action: SettingsActionTypes): SettingsState => {
  switch (action.type) {
    case LOAD_PREFERENCES:
      return {
        ...state,
        nameDisplay: action.preferences[0],
        darkMode: action.preferences[1]
      }
    case TOGGLE_NAME_DISPLAY:
      return {
        ...state,
        nameDisplay: action.nameDisplay
      }
    case TOGGLE_DARK_MODE:
      return {
        ...state,
        darkMode: action.darkMode
      }
    default:
      return state
  }
}