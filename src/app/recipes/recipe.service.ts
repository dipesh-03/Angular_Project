import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

export class RecipeService{

    recipeSelected = new EventEmitter<Recipe>();

    private recipes : Recipe[] = [
        new Recipe('Aloo patties','This is simply a test','https://static.toiimg.com/thumb/84784534.cms?imgsize=468021&width=800&height=800',[
            new Ingredient('Potato',2),
            new Ingredient('Corn Flour',1)
        ]),
        new Recipe('Dabeli','This is simply a test','https://static.toiimg.com/thumb/84784534.cms?imgsize=468021&width=800&height=800',[
            new Ingredient('Pav',1),
            new Ingredient('Potato',1)
        ])
      ];

    getrecipes(){
        return this.recipes.slice();
    }
}