import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe("A Test Recipie", "Just a test", "https://upload.wikimedia.org/wikipedia/commons/f/f8/Various_kimchi.jpg"),
    new Recipe("A Test Recipie2", "Just a test", "https://upload.wikimedia.org/wikipedia/commons/f/f8/Various_kimchi.jpg"),
    new Recipe("A Test Recipie3", "Just a test", "https://upload.wikimedia.org/wikipedia/commons/f/f8/Various_kimchi.jpg")
  ];

  constructor() { }

  ngOnInit() {
  }

}
