import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthUser, User } from 'src/app/models/user.model';
import { AuthResponseData, LoginResponseData } from 'src/app/models/authResponse.model';
import { Observable, of, throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as  authActions from './store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // user: Subject<User> = new BehaviorSubject<User>(null);

  private tokenExpiratuonTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  signUp(authUser: AuthUser): Observable<AuthResponseData> {
    authUser.returnSecureToken = true;
    // tslint:disable-next-line: max-line-length
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`, authUser)
      .pipe(
        catchError(this.handleError),
        tap(resData => this.handleAuthentication(resData))
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error ocurred!';
    if (error.error && error.error.error) {
      switch (error.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email exists already';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'This email does not exist';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'This password is not correct';
          break;
        default:
          break;
      }
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(responseData: AuthResponseData | LoginResponseData) {
    const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
    const authuser = new User(responseData.email, responseData.localId, responseData.idToken, expirationDate);
    // this.user.next(authuser);
    this.store.dispatch(new authActions.AuthenticateSuccess(authuser));
    this.autoLogOut(+responseData.expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(authuser));
  }

  login(user: AuthUser) {
    user.returnSecureToken = true;
    // tslint:disable-next-line: max-line-length
    return this.http.post<LoginResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`, user)
      .pipe(
        catchError(this.handleError),
        // Si intentamos hacer el mismo comportamiento con la funcion en el cathError, el subject User se volver undefined y dara errores.
        tap(resData => this.handleAuthentication(resData))
      );
  }

  logout() {
    // this.user.next(null);
    this.store.dispatch(new authActions.Logout());
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpiratuonTimer) {
      clearTimeout(this.tokenExpiratuonTimer);
    }
    this.tokenExpiratuonTimer = null;
  }

  autoLogin() {
    // TODO preguntar por que se tiene que guardar todo el objeto del usuario en el localStorage
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    // Si el token sigue siendo valido, (la fecha del token no es mayor a la fecha actual), logeara el usuario.
    if (loadedUser.token) {
      // this.user.next(loadedUser);
      this.store.dispatch(new authActions.AuthenticateSuccess(loadedUser));
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogOut(expirationDuration);
    }
  }

  autoLogOut(expirationDuration: number) {
    console.log('expiracion', expirationDuration);
    this.tokenExpiratuonTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
