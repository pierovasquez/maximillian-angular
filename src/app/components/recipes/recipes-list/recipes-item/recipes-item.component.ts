import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.scss']
})
export class RecipesItemComponent implements OnInit {

  @Input() recipe: Recipe;

  constructor(
    private recipeService: RecipesService
  ) { }

  ngOnInit() {
  }

  onRecipeSelected() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }

}
