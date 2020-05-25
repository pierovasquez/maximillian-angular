import { Ingredient } from 'src/app/models/ingredients.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface ShoppingListInitialState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

export interface AppState {
  shoppingList: ShoppingListInitialState;
}

const initialState: ShoppingListInitialState = {
  ingredients: [
    new Ingredient('Apples', 5)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

/**
 * @param state that's the current state before it was changed. If there is no state param, it will take the initialState object
 * @param action The action is that triggers the reducer and in the end, the state update.
 */
export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions): ShoppingListInitialState {
  console.log('state', state);
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, (action as ShoppingListActions.AddIngredient).payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...(action as ShoppingListActions.AddIngredients).payload]
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const actionPayload = (action as ShoppingListActions.UpdateIngredient).payload;

      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = { ...ingredient, ...actionPayload };

      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, index) => index !== state.editedIngredientIndex),
        editedIngredientIndex: -1,
        editedIngredient: null
      };
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: (action as  ShoppingListActions.StartEdit).payload,
        editedIngredient: {...state.ingredients[(action as  ShoppingListActions.StartEdit).payload]}
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    default:
      return state;
  }
}
