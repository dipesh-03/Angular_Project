import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http'
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap } from "rxjs/operators";

@Injectable({providedIn:'root'})
export class DataStorageService{
    constructor(private http:HttpClient , private recipeService:RecipeService){}

    storeRecipes(){
        const recipes = this.recipeService.getrecipes();
        return this.http.put('https://nothing-be935-default-rtdb.firebaseio.com/recipes.json',recipes).subscribe();
    }

    fetchRecipes(){
       return  this.http.get<Recipe[]>('https://nothing-be935-default-rtdb.firebaseio.com/recipes.json')
        .pipe(map(recipes =>{
            return recipes.map(recipe =>{
                return {...recipe , ingredients: recipe.ingredients?recipe.ingredients : [] };
            })
        }),tap( recipes =>{
            this.recipeService.setRecipes(recipes);
        })
        )
        
    }
}