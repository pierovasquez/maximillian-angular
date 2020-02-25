import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {

  @Output() recipeLoaded: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'test', 'https://okdiario.com/img/2019/07/09/pollo-asado-con-brandy-655x368.jpg'),
    new Recipe('A Test Recipe2', 'test2', 'https://okdiario.com/img/2019/07/09/pollo-asado-con-brandy-655x368.jpg'),
  ];

  constructor() { }

  ngOnInit() {
  }

  loadRecipeDetails(recipe: Recipe) {
    this.recipeLoaded.emit(recipe);
  }

}
