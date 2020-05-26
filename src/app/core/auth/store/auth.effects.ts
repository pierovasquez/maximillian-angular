import { Actions, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';

export class AuthEffects {
  
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START)
  );

  // Se utiliza $ para declarar que es un observable dentro de los Ngrx Effects
  // actions$ es un observable que se subscribe a los displatch del store de ngrx.
  // Generalmente querremos añadir acciones una vez nuestro store lance una accion asincrona (http request) y una
  // vez terminada la accion http, al estar suscritos a este dispatch, podremos lanzar una segunda accion
  constructor(private actions$: Actions) { }
}


