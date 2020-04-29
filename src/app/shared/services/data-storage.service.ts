import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Recipe } from 'src/app/models/recipe.model';
import { RecipesService } from 'src/app/components/recipes/recipes.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root' // Con provideIn, no tenemos que importarlo en providers dentro del modulo appModule.
})
export class DataStorageService {

    constructor(
        private http: HttpClient,
        private recipeService: RecipesService
    ) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://maximilian-course.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
                console.log('store', response);
            });
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>('https://maximilian-course.firebaseio.com/recipes.json')
            .pipe(
                map(recipes => recipes.map(recipe => ({ ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}))),
                tap(recipes => this.recipeService.setRecipes(recipes))
            );
    }
}
