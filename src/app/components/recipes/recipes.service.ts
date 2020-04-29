import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { Ingredient } from 'src/app/models/ingredients.model';
import { ShoppingListService } from '../shopping/shopping-list/shopping-list.service';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class RecipesService {

    private $recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>();
    public recipesChanged$: Observable<Recipe[]> = this.$recipesChanged.asObservable();

    // private recipes: Recipe[] = [
    //     new Recipe('A Test Recipe', 'test', 'https://okdiario.com/img/2019/07/09/pollo-asado-con-brandy-655x368.jpg', [
    //         new Ingredient('Meat', 1),
    //         new Ingredient('French Fires', 20)
    //     ]),
    //     new Recipe('A Test Recipe2', 'test2', 'https://okdiario.com/img/2019/07/09/pollo-asado-con-brandy-655x368.jpg', [
    //         new Ingredient('Buns', 2),
    //         new Ingredient('Meat', 1)
    //     ]),
    // ];

    private recipes: Recipe[] = [];

    constructor(
        private sslService: ShoppingListService
    ) { }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.$recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.$recipesChanged.next(this.recipes.slice());
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.sslService.addIngredients(ingredients);
    }
    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number): Recipe {
        return this.recipes[index];
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.$recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.$recipesChanged.next(this.recipes.slice());
    }
}
