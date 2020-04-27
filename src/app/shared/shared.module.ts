import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown/dropdown.directive';
import { FilterRecipePipe } from './pipes/filter-recipe.pipe';

@NgModule({
    declarations: [
        DropdownDirective,
        FilterRecipePipe
    ],
    imports: [],
    exports: [
        DropdownDirective,
        FilterRecipePipe
    ]
})
export class SharedModule { }
