import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { SharedModule } from "../shared/shared.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
  declarations:[
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports:[
    BrowserModule,
    FormsModule,
    SharedModule
  ],
  //No need to export explained in recipes.module.ts
})

export class ShoppingListModule{

}
