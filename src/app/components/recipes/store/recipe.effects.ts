import { Actions, Effect, ofType } from '@ngrx/effects';
import * as RecipesActions from './recipe.actions';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from 'src/app/models/recipe.model';
import { Injectable } from '@angular/core';
import * as fromApp from '../../../core/store/app.reducer';
import { Store } from '@ngrx/store';
import { RecipeInitialState } from './recipe.reducer';

@Injectable()
export class RecipeEffects {

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>('https://maximilian-course.firebaseio.com/recipes.json').pipe(
        map(recipes => recipes.map(recipe => ({ ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }))),
        map(recipes => {
          return new RecipesActions.SetRecipes(recipes);
        })
      );
    })
  );

  @Effect({dispatch: false})
  storeRecipes = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    // witLatestFrom -> Permite unir un valor de un observable dentro de otro
    withLatestFrom(this.store.select('recipes')),
    switchMap((response: [never, RecipeInitialState]) => {
      // storeRecipeClass = {type: "[Recipes] Store Recipes"}
      const [storeRecipeClass, recipeState] = response;
      return this.http.put('https://maximilian-course.firebaseio.com/recipes.json', recipeState.recipes);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) { }
}
