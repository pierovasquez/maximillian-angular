import { Recipe } from 'src/app/models/recipe.model';
import * as RecipesActions from './recipe.actions';

export interface RecipeInitialState {
  recipes: Recipe[];
}

const initialState: RecipeInitialState = {
  recipes: []
};

export function recipeReducer(state = initialState, action: RecipesActions.RecipesActions) {

  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    default:
      return state;
  }

  return state;
}
