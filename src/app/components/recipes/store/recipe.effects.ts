import { Actions, Effect, ofType } from '@ngrx/effects';
import * as RecipesActions from './recipe.actions';
import { switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from 'src/app/models/recipe.model';
import { Injectable } from '@angular/core';

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

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) { }
}
