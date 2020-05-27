import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from './core/store/app.reducer';
import * as AuthActions from './core/auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-maximillian';
  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
    ) {}

  ngOnInit() {
    this.store.dispatch(new AuthActions.AutoLogin());
    // this.authService.autoLogin();
  }
}
