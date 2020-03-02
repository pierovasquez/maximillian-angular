import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  clickedRecipe: Recipe;


  constructor(
    private recipesService: RecipesService
  ) { }

  ngOnInit() {
    this.recipesService.recipeSelected.subscribe((recipe: Recipe) => this.clickedRecipe = recipe);
  }

  loadRecipeDetail(recipe: Recipe) {
    this.clickedRecipe = recipe;
  }
}
