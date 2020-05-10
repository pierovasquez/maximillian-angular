import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipesResolverService } from './recipes-resolver.service';
import { AuthGuard } from 'src/app/core/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '', component: RecipesComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipeStartComponent, pathMatch: 'full' },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipesDetailComponent, resolve: [RecipesResolverService] },
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}
