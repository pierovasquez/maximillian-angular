import { Injectable } from '@angular/core';

// Cuando provees servicios en modulos lazy loading. Estos en vez de compartir la misma instancia por
// toda la aplicacion, los componentes del modulo lazy, tendran una diferente.
// Si importamos servicios a traves de otro modulo (SharedModule) en el modulo lazy, estos tambien tendran otra instancia
// Si se proviese en un modulo en el cual no fuese lazy, se compartiria la instancia por toda la aplicacion
// al igual como si la estuviesemos proveyendo en el AppModule
@Injectable({ providedIn: 'root' })
export class LoggingService {
  lastLong: string;

  printLog(message) {
    console.log('message', message);
    console.log('lastlog', this.lastLong);
    this.lastLong = message;
  }
}
