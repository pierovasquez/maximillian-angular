import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredients.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ShoppingListInitialState } from './store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ingredients: Ingredient[]}>;


  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(
    private shoppingListService: ShoppingListService,
    // Si miramos la funcion reducer de shopping-list, encontramos que devuelve el initialState.
    // Este es un objeto que tiene una propiedad que se llama 'ingredients' (linea 6)
    private store: Store<{ shoppingList: ShoppingListInitialState }>
  ) { }

  ngOnInit() {
    // Usamos select() junto con el nombre de la propiedad que le hemos asignado a la funcion reducer en appModule.
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.shoppingListService.ingredientChanged.pipe(takeUntil(this.ngUnSubscribe))
    //   .subscribe((ingredients: Ingredient[]) => this.ingredients = ingredients);
  }

  ngOnDestroy() {
    // this.ngUnSubscribe.next();
    // this.ngUnSubscribe.complete();
  }

  onEditItem(index: number) {
    this.shoppingListService.emitNewValueStartEditing(index);
  }

}
