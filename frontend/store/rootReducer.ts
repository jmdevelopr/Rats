import { combineReducers } from 'redux';
import { authReducer } from './auth/reducers';
import { postsReducer } from './posts/reducers';
import { settingsReducer } from './settings/reducers';

const rootReducer = combineReducers({
  authReducer,
  postsReducer,
  settingsReducer
});

//export type RootState = ReturnType<typeof rootReducer>
export { rootReducer };