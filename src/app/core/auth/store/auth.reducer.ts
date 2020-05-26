import { User } from 'src/app/models/user.model';
import * as AuthActions from './auth.actions';

export interface AuthReducerState {
  user: User;
}

const initialState: AuthReducerState = {
  user: null
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {

  switch (action.type) {
    case AuthActions.LOGIN:
      const user = (action as AuthActions.Login).payload;
      return {
        ...state,
        user
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}
