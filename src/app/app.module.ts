import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './core/store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './core/auth/store/auth.effects';
import { environment } from 'src/environments/environment';
import { RecipeEffects } from './components/recipes/store/recipe.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Cuando se aplica lazy loading, no es necesario importar los modulos de los cuales se esta utilizando
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    // Tenemos que indicar que reducers estamos utilizando. El nombre 'shoppingList' es totalmente custom.
    StoreModule.forRoot(fromApp.appReducer),
    // Se pasara un array de los efectos (@Effects())
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
