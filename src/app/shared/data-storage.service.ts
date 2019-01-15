import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import 'rxjs/add/operator/map';


@Injectable({providedIn:'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) {
    }

    storeRecipes() {
        return this.http.put("https://recipeapp-25e0c.firebaseio.com/recipes.json", this.recipeService.getRecipes());
    }

    getRecipes() {
        this.http.get<Recipe[]>("https://recipeapp-25e0c.firebaseio.com/recipes.json")
        .map(
            (recipes) => {
                for (let recipe of recipes) {
                    if(!recipe["ingredients"]) {
                        recipe["ingredients"] = [];
                    }
                }

                return recipes;
            }
        )
        .subscribe(
            (recipes) => {
                    this.recipeService.setRecipes(recipes);
                }
               
        );
    }
}