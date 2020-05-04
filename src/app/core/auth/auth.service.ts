import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthUser, User } from 'src/app/models/user.model';
import { AuthResponseData, LoginResponseData } from 'src/app/models/authResponse.model';
import { Observable, of, throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Subject<User> = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient
  ) { }

  signUp(authUser: AuthUser): Observable<AuthResponseData> {
    authUser.returnSecureToken = true;
    // tslint:disable-next-line: max-line-length
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCtwcWtjBexxifgeZ5-D-tPp_WQHlwZVjY', authUser)
      .pipe(
        catchError(this.handleError),
        tap(resData => this.handleAuthentication(resData))
      );
  }

  login(user: AuthUser) {
    user.returnSecureToken = true;
    // tslint:disable-next-line: max-line-length
    return this.http.post<LoginResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCtwcWtjBexxifgeZ5-D-tPp_WQHlwZVjY', user)
      .pipe(
        catchError(this.handleError),
        // Si intentamos hacer el mismo comportamiento con la funcion en el cathError, el subject User se volver undefined y dara errores.
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

    this.user.next(authuser);
  }
}
