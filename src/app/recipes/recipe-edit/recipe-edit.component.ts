import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id : number;
  editmode = false;
  recipeForm : FormGroup

  constructor(private route:ActivatedRoute , private recipeService:RecipeService){};

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params) =>{
        this.id = +params['id'];
        this.editmode = params['id'] != null;
        this.inItForm();
      }
    );
  }

  onSubmit(){
    console.log(this.recipeForm);
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(),
        'amount': new FormControl()
      })
    )
  }

  private inItForm(){

    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editmode){
      const recipe = this.recipeService.getrecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name),
              'amount': new FormControl(ingredient.amount)
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName),
      'imagePath' : new FormControl(recipeImagePath),
      'description' : new FormControl(recipeDescription),
      'ingredients' : recipeIngredients
    });
  }
  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

}
