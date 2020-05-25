import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('shoppingEditForm', { static: false }) shoppingForm: NgForm;

  private ngUnsubscribe: Subject<void> = new Subject<void>();


  public editMode = false;
  public editedItem: Ingredient;
  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) { }

  ngOnInit() {
    this.store.select('shoppingList').pipe(takeUntil(this.ngUnsubscribe)).subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.shoppingForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      } else {
        this.editMode = false;
      }
    });
    // this.shoppingListService.startedEditing$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(index => {
    //   this.editMode = true;
    //   this.editedItemIndex = index;
    //   this.editedItem = this.shoppingListService.getIngredientByIndex(index);
    //   this.shoppingForm.setValue({
    //     name: this.editedItem.name,
    //     amount: this.editedItem.amount
    //   });
    // });
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient: Ingredient = new Ingredient(value.name, value.amount);
    if (!this.editMode) {
      // this.shoppingListService.addIngredient(newIngredient);
      // Utilizamos dispatch para asociar la accion que queremos que ejecute ngrx
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    } else {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient));
      // this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    }
    this.resetForm();
  }

  private resetForm() {
    this.shoppingForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDeleteItem() {
    if (this.editMode) {
      // this.shoppingListService.deleteIngredient(this.editedItemIndex);
      this.store.dispatch(new ShoppingListActions.DeleteIngredient());
      this.resetForm();
    }
  }

  onClear() {
    this.resetForm();
  }
}
