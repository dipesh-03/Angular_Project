import { NgModule } from "@angular/core";
import { Routes , RouterModule} from "@angular/router";

import { Authgaurd } from "../auth/auth-gaurd";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesResolverService } from "./recipes-resolver.service";
import { RecipesStartComponent } from "./recipes-start/recipes-start.component";
import { RecipesComponent } from "./recipes.component";

const routes : Routes = [
  {path:'recipes' , component:RecipesComponent, canActivate:[Authgaurd] , children:[
    {path:'' , component:RecipesStartComponent},
    {path:'new' , component:RecipeEditComponent},
    {path:':id' , component:RecipeDetailComponent , resolve: [RecipesResolverService ]},
    {path:':id/edit' , component:RecipeEditComponent , resolve: [RecipesResolverService]}
  ]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RecipesRoutingModule{}
