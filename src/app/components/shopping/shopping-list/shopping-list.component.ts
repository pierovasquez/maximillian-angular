import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredients.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../../../core/store/app.reducer';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  animations: [
    trigger('divState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0)'
      })),
      state('highlighted', style({
        'background-color': 'blue',
        transform: 'translateX(100px)'
      })),
      transition('normal <=> highlighted', animate(300))
    ]),
    trigger('wildState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0) scale(1)'
      })),
      state('highlighted', style({
        'background-color': 'blue',
        transform: 'translateX(100px) scale(1)'
      })),
      state('shrunken', style({
        'background-color': 'green',
        transform: 'translateX(0) scale(0.5)'
      })),
      transition('normal <=> highlighted', animate(300)),
      transition('shrunken <=> *', [
        // Al poner este codigo indicamos el valor inicial al cliclar en 'Shrink' que es background-color: 'orange'
        // Despues sigue con una animacion del borde por un segundo, y el resto de animacion para llegar al punto final
        // * (wildcard) se ejecutara en una animacion de 500 milisegundos
        style({
          'background-color': 'orange',
          'border-radius': '0px'
        }),
        animate(1000, style({
          'border-radius': '50px'
        })),
        animate(500)
      ])
    ]),
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      // void es un estado reservado que indica si el estado final de un elemento no esta añadido al DOM
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({
          transform: 'translateX(100px)',
          opacity: 0
        }))
      ])
    ]),
    trigger('list2', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *',
        animate(1000, keyframes([
          // Todos estos estilos cogeran una parte igual de los 1000 milisegundos
          // con el offset, indicamos en que punto del milisegundo quieres que se ejecute el style
          style({
            transform: 'translateX(-100px)',
            opacity: 0,
            offset: 0,
          }),
          style({
            transform: 'translateX(-50px)',
            opacity: 0.5,
            offset: 0.3
          }),
          style({
            transform: 'translateX(-20px)',
            opacity: 1,
            offset: 0.8
          }),
          style({
            transform: 'translateX(0px)',
            opacity: 1,
            offset: 1
          })
        ]))
      ),
      transition('* => void', [
        // Utilizamos el group para animar simultaneamente dos animaciones.
        group([
          animate(300, style({
            color: 'red',
            opacity: 0
          })),
          animate(800, style({
            transform: 'translateX(100px)',
            opacity: 0
          }))
        ])
      ])
    ]),
  ]
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  state = 'normal';
  wildState = 'normal';

  ingredients: Observable<{ ingredients: Ingredient[] }>;

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

  onAnimate() {
    this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal';
    this.wildState === 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal';
  }

  onShrink() {
    this.wildState = 'shrunken';
  }

}
