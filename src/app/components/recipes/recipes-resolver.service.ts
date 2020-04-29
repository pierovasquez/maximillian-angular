import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { RecipesService } from './recipes.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

    constructor(
        private dataStorageService: DataStorageService,
        private recipeService: RecipesService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> {
        const recipes = this.recipeService.getRecipes();
        if (recipes.length === 0) {
            return this.dataStorageService.fetchRecipes();
        } else {
            return recipes;
        }
    }
}
