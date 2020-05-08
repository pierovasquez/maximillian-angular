import { NgModule } from '@angular/core';
import { DropdownDirective } from './directives/dropdown/dropdown.directive';
import { FilterRecipePipe } from './pipes/filter-recipe.pipe';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { AlertModelComponent } from './components/alert-model/alert-model.component';

@NgModule({
    declarations: [
        DropdownDirective,
        FilterRecipePipe,
        LoadingSpinnerComponent,
        AlertModelComponent
    ],
    imports: [],
    exports: [
        DropdownDirective,
        FilterRecipePipe,
        LoadingSpinnerComponent,
        AlertModelComponent
    ]
})
export class SharedModule { }
