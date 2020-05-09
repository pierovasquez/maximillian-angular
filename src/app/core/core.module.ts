import { NgModule } from '@angular/core';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AlertModelComponent } from '../shared/components/alert-model/alert-model.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from '../shared/components/loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from '../shared/directives/placeholder/placeholder.directive';

@NgModule({
  declarations: [
    AuthComponent,
    PlaceholderDirective,
    HeaderComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path: 'auth', component: AuthComponent}
    ])
  ],
  exports: [
    AuthComponent,
    HeaderComponent
  ],
  // Es un array de componentes que solo se crearan eventualmente sin un selector o sin el uso de rutas.
  entryComponents: [
    AlertModelComponent
  ]
})
export class CoreModule { }
