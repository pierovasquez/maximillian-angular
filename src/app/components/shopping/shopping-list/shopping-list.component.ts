import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredients.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../../../core/store/app.reducer';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ingredients: Ingredient[]}>;

  constructor(
    // Si miramos la funcion reducer de shopping-list, encontramos que devuelve el initialState.
    // Este es un objeto que tiene una propiedad que se llama 'ingredients' (linea 6)
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    // Usamos select() junto con el nombre de la propiedad que le hemos asignado a la funcion reducer en appModule.
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.shoppingListService.ingredientChanged.pipe(takeUntil(this.ngUnSubscribe))
    //   .subscribe((ingredients: Ingredient[]) => this.ingredients = ingredients);
  }

  ngOnDestroy() {
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
    // this.shoppingListService.emitNewValueStartEditing(index);
  }

}
