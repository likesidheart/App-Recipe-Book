import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { Recipe } from '../../models/recipe';
import { RecipesService } from '../../services/recipes.service';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes:Recipe[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private recipesService:RecipesService) {
  }

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }
  ionViewWillEnter() {
    this.recipes = this.recipesService.getRecipes();
  }
  onLoadRecipe() {

  }
}
