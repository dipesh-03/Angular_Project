import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  private inItForm(){

    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';

    if(this.editmode){
      const recipe = this.recipeService.getrecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
    }
    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName),
      'imagePath' : new FormControl(recipeImagePath),
      'description' : new FormControl(recipeDescription)
    });
  }

}
