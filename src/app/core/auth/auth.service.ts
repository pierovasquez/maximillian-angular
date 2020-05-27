import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as  authActions from './store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenExpiratuonTimer: any;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  setLogoutTimer(expirationDuration: number) {
    console.log('expiracion', expirationDuration);
    this.tokenExpiratuonTimer = setTimeout(() => {
      this.store.dispatch(new authActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpiratuonTimer) {
      clearTimeout(this.tokenExpiratuonTimer);
      this.tokenExpiratuonTimer = null;
    }
  }
}
