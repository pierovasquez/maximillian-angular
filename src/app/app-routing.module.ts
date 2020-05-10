import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', loadChildren: () => import('./components/recipes/recipes.module').then(m => m.RecipesModule) },
  { path: 'shopping-list', loadChildren: () => import('./components/shopping/shopping.module').then(m => m.ShoppingModule) },
];

@NgModule({
  // preloadingStategy: PreloadAllModules
  // esta configuracion añade la funcionalidad de que despues de que cargue el primer bundle, el cual esta
  // optimizado por lazy loading, cargue seguidamente el resto. Asi tenemos la mejor configuracion, una vez cargue el bundle
  // pequeño, tenemos la vista mas rapida ya que no cargamos todos los modulos. Y una vez cargado el primer bundle cargara el resto
  // asi al clicar en otra ruta que requiera el loading de componentes, este ya habra cargado ejecutandose todo mas rapido.
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
