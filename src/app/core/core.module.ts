import { NgModule } from '@angular/core';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AlertModelComponent } from '../shared/components/alert-model/alert-model.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { PlaceholderDirective } from '../shared/directives/placeholder/placeholder.directive';
import { RecipesService } from '../components/recipes/recipes.service';
import { ShoppingListService } from '../components/shopping/shopping-list/shopping-list.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
  declarations: [
    AuthComponent,
    PlaceholderDirective,
    HeaderComponent
  ],
  imports: [
    FormsModule,
    RouterModule.forChild([
      {path: 'auth', component: AuthComponent}
    ]),
    SharedModule
  ],
  exports: [
    AuthComponent,
    HeaderComponent
  ],
  providers: [
    RecipesService,
    ShoppingListService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  // Es un array de componentes que solo se crearan eventualmente sin un selector o sin el uso de rutas.
  entryComponents: [
    AlertModelComponent
  ]
})
export class CoreModule { }
