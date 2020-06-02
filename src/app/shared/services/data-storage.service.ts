import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Recipe } from 'src/app/models/recipe.model';
import { RecipesService } from 'src/app/components/recipes/recipes.service';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../../core/store/app.reducer';
import * as RecipesActions from '../../components/recipes/store/recipe.actions';

@Injectable({
    providedIn: 'root' // Con provideIn, no tenemos que importarlo en providers dentro del modulo appModule.
})
export class DataStorageService {

    constructor(
        private http: HttpClient,
        private recipeService: RecipesService,
        private store: Store<fromApp.AppState>
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
                map(recipes => recipes.map(recipe => ({ ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }))),
                tap(recipes => this.store.dispatch(new RecipesActions.SetRecipes(recipes)))
            );
    }
}
