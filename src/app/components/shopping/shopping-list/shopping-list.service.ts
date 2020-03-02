import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredients.model';

@Injectable()
export class ShoppingListService {
    ingredientChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 5)
    ];

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientChanged.emit(this.ingredients.slice());
    }

    getIngredients() {
        return this.ingredients.slice();
    }
}
