import { Recipe } from 'src/app/models/recipe.model';

export interface RecipeInitialState {
  recipes: Recipe[];
}

const initialState: RecipeInitialState = {
  recipes: []
};

export function recipeReducer(state = initialState, action) {

  return state;
}
