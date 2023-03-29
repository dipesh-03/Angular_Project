import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipesRoutingModule } from "./recipes-routing.module";
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
    RecipesRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  // We do not need export this beacuse we are using this components internally
  // exports:[
  //   RecipesComponent,
  //   RecipeListComponent,
  //   RecipeItemComponent,
  //   RecipeDetailComponent,
  //   RecipesStartComponent,
  //   RecipeEditComponent,
  // ]
})

export class RecipesModule{

}
