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
        recipes: [...(action as RecipesActions.SetRecipes).payload]
      };
    case RecipesActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, (action as RecipesActions.AddRecipe).payload]
      };
    case RecipesActions.UPDATE_RECIPE:
      const updatedRecipe = {
        ...state.recipes[(action as RecipesActions.UpdateRecipe).payload.index],
        ...(action as RecipesActions.UpdateRecipe).payload.newRecipe
      };

      const updatedRecipes = [...state.recipes];
      updatedRecipes[(action as RecipesActions.UpdateRecipe).payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: updatedRecipes
      };
    case RecipesActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => index !== (action as RecipesActions.DeleteRecipe).payload)
      };
    default:
      return state;
  }

  return state;
}
