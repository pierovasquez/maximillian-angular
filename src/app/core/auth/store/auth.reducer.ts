import { User } from 'src/app/models/user.model';
import * as AuthActions from './auth.actions';

export interface AuthReducerState {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: AuthReducerState = {
  user: null,
  authError: null,
  loading: false
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {

  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const user = (action as AuthActions.AuthenticateSuccess).payload;
      return {
        ...state,
        authError: null,
        login: false,
        user
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      };
    case AuthActions.LOGIN_START:
      return {
        ...state,
        loading: true,
        authError: null
      };
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        loading: false,
        authError: (action as AuthActions.AuthenticateFail).payload
      };
    default:
      return state;
  }
}
