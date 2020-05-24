import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from './components/shopping/shopping-list/store/shopping-list.reducer';

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
    StoreModule.forRoot({shoppingList: shoppingListReducer})
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
