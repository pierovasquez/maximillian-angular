import { NgModule } from '@angular/core';
import { DropdownDirective } from './directives/dropdown/dropdown.directive';
import { FilterRecipePipe } from './pipes/filter-recipe.pipe';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
    declarations: [
        DropdownDirective,
        FilterRecipePipe,
        LoadingSpinnerComponent
    ],
    imports: [],
    exports: [
        DropdownDirective,
        FilterRecipePipe,
        LoadingSpinnerComponent
    ]
})
export class SharedModule { }
