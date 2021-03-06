import { ShoppingListService } from './../shoping-list/shopping-list.service';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: "root"})
export class RecipeService {

    recipeChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe("Kimchi", "Just a test", "https://upload.wikimedia.org/wikipedia/commons/f/f8/Various_kimchi.jpg",[new Ingredient("Cabbage", 1), new Ingredient("Red Pepper", 5) ]),
        new Recipe("Hamburger", "Just a test", "https://upload.wikimedia.org/wikipedia/commons/4/47/Hamburger_%28black_bg%29.jpg", [new Ingredient("Meat", 1), new Ingredient("Bread", 2)])
      ];

      constructor(private slService: ShoppingListService) {

      }
      setRecipes(recipes: Recipe[]) {
          this.recipes = recipes;
          this.recipeChanged.next(this.recipes.slice());
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

      addRecipe(recipe: Recipe) {
          this.recipes.push(recipe);
          this.recipeChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe) {
          this.recipes[index] = newRecipe;
          this.recipeChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
          this.recipes.splice(index, 1);
          this.recipeChanged.next(this.recipes.slice());
      }
}