export interface SettingsState {
    nameDisplay: boolean;
    darkMode: boolean;
}

export const LOAD_PREFERENCES = 'LOAD_PREFERENCES';
export const TOGGLE_NAME_DISPLAY = 'TOGGLE_NAME_DISPLAY';
export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';

interface LoadPreferencesAction {
  type: typeof LOAD_PREFERENCES
  preferences: Array<boolean>
}

interface ToggleNameDisplayAction {
  type: typeof TOGGLE_NAME_DISPLAY
  nameDisplay: boolean
}

interface ToggleDarkModeAction {
  type: typeof TOGGLE_DARK_MODE
  darkMode: boolean
}

export type SettingsActionTypes = LoadPreferencesAction|ToggleNameDisplayAction|ToggleDarkModeAction

//multiple actions type would look like this
//export type ChatActionTypes = SendMessageAction | DeleteMessageAction