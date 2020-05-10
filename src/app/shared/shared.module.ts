import { NgModule } from '@angular/core';
import { DropdownDirective } from './directives/dropdown/dropdown.directive';
import { FilterRecipePipe } from './pipes/filter-recipe.pipe';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { AlertModelComponent } from './components/alert-model/alert-model.component';
import { PlaceholderDirective } from './directives/placeholder/placeholder.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        DropdownDirective,
        FilterRecipePipe,
        AlertModelComponent,
        LoadingSpinnerComponent,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DropdownDirective,
        FilterRecipePipe,
        AlertModelComponent,
        LoadingSpinnerComponent,
        CommonModule,
    ]
})
export class SharedModule { }
