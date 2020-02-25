import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  clickedRecipe: Recipe;


  constructor() { }

  ngOnInit() {
  }

  loadRecipeDetail(recipe: Recipe) {
    this.clickedRecipe = recipe;
  }
}
