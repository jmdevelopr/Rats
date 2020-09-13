export interface AuthState {
    data?: IUser | IErrors;
}

export const CREATE_USER = 'CREATE_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const DELETE_ACC = 'DELETE_ACC';
export const CHECK_TOKEN = 'CHECK_TOKEN';
export const UPDATE_STATE_REACTION = 'UPDATE_STATE_REACTION';

interface CreateUserAction {
  type: typeof CREATE_USER;
  data: {
    id: string;
    email: string;
    username: string;
    usernameError: string;
    emailError: string;
    passwordError: string;
  }
}

interface LoginUserAction {
  type: typeof LOGIN_USER;
  data: {
    id: string;
    email: string;
    username: string;
    usernameError: string;
    emailError: string;
    passwordError: string;
  }
}

interface LogoutUserAction {
  type: typeof LOGOUT_USER;
  data: {
    redirect: string;
  }
}

interface ChangePasswordAction {
  type: typeof CHANGE_PASSWORD;
  data: {
    emailError?: string;
  }
}

interface DeleteAccAction {
  type: typeof DELETE_ACC;
  redirect: string;
}

interface CheckTokenAction {
  type: typeof CHECK_TOKEN,
  data: {
    id: string; 
    email: string;
    username: string;
    preferences: Array<boolean>;
    reactions: [
      {
          _id: string;
          id: string;
          reaction: string;
      }
  ]
    redirect: string;
  }
}

interface UpdateStateReactionAction {
  type: typeof UPDATE_STATE_REACTION;
  reaction: string;
  postID: string;
}

export type AuthActionTypes = CreateUserAction|LoginUserAction|LogoutUserAction|ChangePasswordAction|DeleteAccAction|CheckTokenAction|UpdateStateReactionAction;