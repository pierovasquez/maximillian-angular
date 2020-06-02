import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipesService } from '../recipes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, tap, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as fromApp from '../../../core/store/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.scss']
})
export class RecipesDetailComponent implements OnInit, OnDestroy {

  recipe: Recipe;
  id: number;

  private ngUnsubscribe: Subject<void> = new Subject();

  constructor(
    private recipeService: RecipesService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      tap(id => this.id = +id),
      switchMap(id => {
        return this.store.select('recipes').pipe(map(re => re.recipes.find((recipe, index) => index === this.id)));
      })
    ).subscribe((res: Recipe) => this.recipe = res);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    // this.router.navigate(['edit'], { relativeTo: this.route });
    this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
