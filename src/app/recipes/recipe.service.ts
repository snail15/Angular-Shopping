import { ShoppingListService } from './../shoping-list/shopping-list.service';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({providedIn: "root"})
export class RecipeService {

    private recipes: Recipe[] = [
        new Recipe("Kimchi", "Just a test", "https://upload.wikimedia.org/wikipedia/commons/f/f8/Various_kimchi.jpg",[new Ingredient("Cabbage", 1), new Ingredient("Red Pepper", 5) ]),
        new Recipe("Hamburger", "Just a test", "https://upload.wikimedia.org/wikipedia/commons/4/47/Hamburger_%28black_bg%29.jpg", [new Ingredient("Meat", 1), new Ingredient("Bread", 2)])
      ];

      constructor(private slService: ShoppingListService) {

      }

      getRecipes() {
          return this.recipes.slice();
      }

      getRecipe(index: number) {
          return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
      }
}