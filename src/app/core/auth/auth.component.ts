import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthUser } from 'src/app/models/user.model';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { AuthResponseData, LoginResponseData } from 'src/app/models/authResponse.model';
import { Router } from '@angular/router';
import { AlertModelComponent } from 'src/app/shared/components/alert-model/alert-model.component';
import { PlaceholderDirective } from 'src/app/shared/directives/placeholder/placeholder.directive';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;

  public isLoginMode = true;
  public isLoading = false;
  public error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() { }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    } else {
      this.isLoading = true;
      const newUser = this.generateNewUserAndSetValues(form.value);
      const authObservable: Observable<AuthResponseData | LoginResponseData> = this.setAuthObservable(newUser);

      authObservable.subscribe(resData => {
        console.log('resData', resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
        errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.showErrorAlert(errorMessage);
          this.isLoading = false;
        });
      form.reset();
    }
  }

  private generateNewUserAndSetValues(formValue): AuthUser {
    const newUser = new AuthUser();
    newUser.email = formValue.email;
    newUser.password = formValue.password;
    return newUser;
  }
  private setAuthObservable(newUser: AuthUser): Observable<AuthResponseData | LoginResponseData> {
    if (!this.isLoginMode) {
      return this.authService.signUp(newUser);
    } else {
      return this.authService.login(newUser);
    }
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
    this.error = null;
  }

}
