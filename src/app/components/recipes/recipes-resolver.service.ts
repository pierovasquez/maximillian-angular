import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { RecipesService } from './recipes.service';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../core/store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

    constructor(
        private actions$: Actions,
        private store: Store<fromApp.AppState>
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> {
        // const recipes = this.recipeService.getRecipes();
        // if (recipes.length === 0) {
        //     return this.dataStorageService.fetchRecipes();
        // } else {
        //     return recipes;
        // }
        return this.store.select('recipes').pipe(
            take(1),
            map(reci => reci.recipes),
            switchMap(recipes => {
                if (recipes.length === 0) {
                    this.store.dispatch(new RecipesActions.FetchRecipes());
                    return this.actions$.pipe(ofType(RecipesActions.SET_RECIPES), take(1));
                } else {
                    return of(recipes);
                }
            })
        );

    }
}
