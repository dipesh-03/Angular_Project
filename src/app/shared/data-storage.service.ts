import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http'
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable({providedIn:'root'})
export class DataStorageService{
    constructor(private http:HttpClient , private recipeService:RecipeService){}

    storeRecipes(){
        const recipes = this.recipeService.getrecipes();
        return this.http.put('https://nothing-be935-default-rtdb.firebaseio.com/recipes.json',recipes).subscribe();
    }

    fetchRecipes(){
        this.http.get<Recipe[]>('https://nothing-be935-default-rtdb.firebaseio.com/recipes.json').subscribe(
            recipes => {
                this.recipeService.setRecipes(recipes);
            }
        );
    }
}