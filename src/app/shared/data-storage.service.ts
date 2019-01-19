import { AuthService } from './../auth/auth.servoce';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import 'rxjs/add/operator/map';


@Injectable({providedIn:'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {
    }

    storeRecipes() {
        const token = this.authService.getToken();
        return this.http.put("https://recipeapp-25e0c.firebaseio.com/recipes.json?auth=" + token, this.recipeService.getRecipes());
    }

    getRecipes() {
        const token = this.authService.getToken();
        this.http.get<Recipe[]>("https://recipeapp-25e0c.firebaseio.com/recipes.json?auth=" + token)
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