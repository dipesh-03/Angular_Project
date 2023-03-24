import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
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

    constructor(private slService: ShoppingListService){};

    getrecipes(){
        return this.recipes.slice();
    }

    getrecipe(index : number){
        return this.recipes.slice()[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    }
}