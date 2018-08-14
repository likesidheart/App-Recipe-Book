import { Recipe } from "../models/recipe";
import { Ingredient } from "../models/ingredient";
import { HttpClient } from '@angular/common/http';
import { AuthService } from "./auth.service";
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Injectable } from "../../node_modules/@angular/core";
@Injectable()
export class RecipesService {
    private recipes: Recipe[] = [];

    constructor(private authService: AuthService, private http: HttpClient) { }

    addRecipe(title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
        this.recipes.push(new Recipe(title, description, difficulty, ingredients))
        console.log(this.recipes)
    }
    getRecipes() {
        return this.recipes.slice();
    }
    updateRecipe(index: number, title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
        this.recipes[index] = new Recipe(title, description, difficulty, ingredients)
    }
    removeRecipe(index: number) {
        this.recipes.splice(index, 1);
    }
    storeList(token: string) {
        let userId = this.authService.getActiveUser().uid;
        return this.http.put('https://ionic-recipebook-40225.firebaseio.com/' + userId + '/recipes.json?auth=' + token, this.recipes)
            .map((res: Response) => res.json());
    }
    fetchlist(token: string) {
        let userId = this.authService.getActiveUser().uid;
        return this.http.get('https://ionic-recipebook-40225.firebaseio.com/' + userId + '/recipes.json?auth=' + token)
            .map((res: Response) => {
                let recipes:Recipe[] = res.json() ? res.json(): [];
                for (let item of recipes) {
                    if(!item.hasOwnProperty('ingredients')) {
                        item.ingredients = [];  
                    }
                }
                return recipes;
            })
            .do((recipes: Recipe[]) => {
                if (recipes) {
                    this.recipes = recipes;
                } else {
                    this.recipes = [];
                }
            })
    }
}