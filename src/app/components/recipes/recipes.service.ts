import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { Ingredient } from 'src/app/models/ingredients.model';
import { ShoppingListService } from '../shopping/shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipesService {

    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 'test', 'https://okdiario.com/img/2019/07/09/pollo-asado-con-brandy-655x368.jpg', [
            new Ingredient('Meat', 1),
            new Ingredient('French Fires', 20)
        ]),
        new Recipe('A Test Recipe2', 'test2', 'https://okdiario.com/img/2019/07/09/pollo-asado-con-brandy-655x368.jpg', [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 1)
        ]),
    ];

    constructor(
        private sslService: ShoppingListService
    ) { }


    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.sslService.addIngredients(ingredients);
    }
    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number): Recipe {
        return this.recipes[index];
    }
}
