import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ShoppingListService {

    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    wasEdited = false;
    wasDeleted = new Subject<boolean>();

    ingredients: Ingredient[] = [
        new Ingredient("Apples", 5),
        new Ingredient("Tomatoes", 10)
      ];

      getIngredients() {
          return this.ingredients.slice();
      }

      addIngredient(ingredient: Ingredient) {
        this.wasDeleted.next(false); 
        this.wasEdited = false;
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      addIngredients(ingredients: Ingredient[]) {
        this.wasDeleted.next(false);
        this.wasEdited = false;
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      getIngredient(index: number) {
        return this.ingredients[index];
      }

      updateIngredient(index: number, newIngredient: Ingredient) {
        this.wasDeleted.next(false);  
        this.wasEdited = true;
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      deleteIngredient(index: number) {
        this.wasEdited = false;
        this.ingredients.splice(index);
        this.wasDeleted.next(true);
        this.ingredientsChanged.next(this.ingredients.slice());
        
      }

      private switchedEdit() {
          this.wasEdited = !this.wasEdited;
      }
}