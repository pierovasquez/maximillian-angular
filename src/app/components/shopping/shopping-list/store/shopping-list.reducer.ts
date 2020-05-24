import { Ingredient } from 'src/app/models/ingredients.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface ShoppingListInitialState {
  ingredients: Ingredient[];
}

const initialState: ShoppingListInitialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 5)
  ]
};

/**
 * @param state that's the current state before it was changed. If there is no state param, it will take the initialState object
 * @param action The action is that triggers the reducer and in the end, the state update.
 */
export function shoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredient): ShoppingListInitialState {

  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    default:
      return state;
  }
}
