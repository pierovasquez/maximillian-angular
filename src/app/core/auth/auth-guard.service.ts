import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, tap, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  // tslint:disable-next-line: max-line-length
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean| UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map(user => {
      const isAuth = !!user;
      if (isAuth) {
        return true;
      }
      // El beneficio de usar el parse() o createUrlTree es que angular optimiza mejor las redirecciones. Si el Router de angular tiene
      // algun createUrl o parseurl, estas redirecciones tendran prioridad y automaticamente cancelara otros posibles redireccionamientos
      // de otros GUARDS

      // return this.router.parseUrl('/auth');
      return this.router.createUrlTree(['/auth']);
    }),
    // El metodo tap se utilizaba en versiones anteriores de angular y funciona correctamente. El problema es que en algunas ocasiones, esto
    // podria generar loops infinitos sin que termine las redirecciones.
    // tap(isAuth => {if (!isAuth) {this.router.navigate(['/auth']); }
    // })
    );
  }

}
