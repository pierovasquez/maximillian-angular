import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthUser } from 'src/app/models/user.model';
import { AuthService } from './auth.service';
import { Observable, Subject } from 'rxjs';
import { AuthResponseData, LoginResponseData } from 'src/app/models/authResponse.model';
import { Router } from '@angular/router';
import { AlertModelComponent } from 'src/app/shared/components/alert-model/alert-model.component';
import { PlaceholderDirective } from 'src/app/shared/directives/placeholder/placeholder.directive';
import { take, takeUntil } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;

  public isLoginMode = true;
  public isLoading = false;
  public error: string = null;

  private $ngUnsubscribe = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.store.select('auth').pipe(takeUntil(this.$ngUnsubscribe)).subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });
  }

  ngOnDestroy() {
    this.$ngUnsubscribe.next();
    this.$ngUnsubscribe.complete();
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const newUser = this.generateNewUserAndSetValues(form.value);
    if (this.isLoginMode) {
      this.store.dispatch(new AuthActions.LoginStart(newUser));
    } else {
      this.store.dispatch(new AuthActions.SignUpStart(newUser));
    }
    // authObservable.subscribe(resData => {
      //   console.log('resData', resData);
      //   this.isLoading = false;
      //   this.router.navigate(['/recipes']);
      // },
      //   errorMessage => {
      //     console.log(errorMessage);
      //     this.error = errorMessage;
      //     this.showErrorAlert(errorMessage);
      //     this.isLoading = false;
      //   });
    form.reset();

  }

  private generateNewUserAndSetValues(formValue): AuthUser {
    const newUser = new AuthUser();
    newUser.email = formValue.email;
    newUser.password = formValue.password;
    return newUser;
  }

  private showErrorAlert(message: string) {
    // Al parecer, no hace falta que el modulo de core tenga importado el componente
    // AlertComponent para poder utilizarlo en codigo.
    // Por otra parte, para poder utilizar el viewChild con alertHost, si que hace falta.
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertModelComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    componentRef.instance.closeAlert.pipe(take(1)).subscribe(() => {
      hostViewContainerRef.clear();
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onHandleError() {
    this.store.dispatch(new AuthActions.ClearError());
  }

}
