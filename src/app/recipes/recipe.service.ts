import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

export class RecipeService{

    recipeSelected = new EventEmitter<Recipe>();

    private recipes : Recipe[] = [
        new Recipe('A Test Recipe','This is simply a test','https://static.toiimg.com/thumb/84784534.cms?imgsize=468021&width=800&height=800'),
        new Recipe('Another Test Recipe','This is simply a test','https://static.toiimg.com/thumb/84784534.cms?imgsize=468021&width=800&height=800')
      ];

    getrecipes(){
        return this.recipes.slice();
    }
}