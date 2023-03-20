import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipes : Recipe[] = [
    new Recipe('A Test Recipe','This is simply a test','https://static.toiimg.com/thumb/84784534.cms?imgsize=468021&width=800&height=800')
  ];

  constructor(){};

}
