import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredients.model';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class ShoppingListService {
    public ingredientChanged: Subject<Ingredient[]> = new Subject<Ingredient[]>();
    private $startedEditing: Subject<number> = new Subject<number>();

    public startedEditing$: Observable<number> = this.$startedEditing.asObservable();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 5)
    ];

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientChanged.next(this.ingredients.slice());
    }


    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredientByIndex(index: number) {
        return this.ingredients[index];
    }

    emitNewValueStartEditing(num: number) {
        this.$startedEditing.next(num);
    }
}
