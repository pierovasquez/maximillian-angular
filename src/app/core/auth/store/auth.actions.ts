import { Action } from '@ngrx/store';
import { User, AuthUser } from 'src/app/models/user.model';

export const LOGIN_START = '[Auth] Login Start';
export const LOGOUT = '[Auth] Logout';

export const AUTHENTICATE_SUCCESS = '[Auth] Login';
export const AUTHENTICATE_FAIL = '[Auth] Login Fail';

export const SIGN_UP_START = '[Auth] Sign Up Start';


export class AuthenticateSuccess implements Action {
  readonly type: string = AUTHENTICATE_SUCCESS;

  constructor(public payload: User) {}
}

export class Logout implements Action {
  readonly type: string = LOGOUT;
}

export class LoginStart implements Action {
  readonly type: string = LOGIN_START;

  constructor(public payload: AuthUser) {}
}

export class AuthenticateFail implements Action {
  readonly type: string = AUTHENTICATE_FAIL;

  constructor(public payload: string) {}
}

export class SignUpStart implements Action {
  readonly type: string = SIGN_UP_START;

  constructor(public payload: AuthUser) {}
}

export type AuthActions = AuthenticateSuccess | Logout | LoginStart | AuthenticateFail;
