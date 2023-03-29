import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipesStartComponent } from "./recipes-start/recipes-start.component";
import { RecipesComponent } from "./recipes.component";

@NgModule({
  declarations:[
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipesStartComponent,
    RecipeEditComponent,
  ],
  imports:[
    RouterModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipesStartComponent,
    RecipeEditComponent,
  ]
})

export class RecipesModule{

}
