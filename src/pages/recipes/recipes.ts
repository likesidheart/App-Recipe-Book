import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { Recipe } from '../../models/recipe';
import { RecipesService } from '../../services/recipes.service';
import { RecipePage } from '../recipe/recipe';
import { AuthService } from '../../services/auth.service';
import { ShoppingListOptionsPage } from '../shopping-list/shopping-list-options/shopping-list-options';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes:Recipe[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private recipesService:RecipesService,private popCtrl:PopoverController,
  private loadingCtrl:LoadingController,private authService:AuthService,private alertCtrl:AlertController) {
  }

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }
  ionViewWillEnter() {
    this.recipes = this.recipesService.getRecipes();
  }
  onLoadRecipe(recipe:Recipe, index:number) {
    this.navCtrl.push(RecipePage,{recipe:recipe,index:index})
  }
  onShowOptions(event: MouseEvent) {
    let loading = this.loadingCtrl.create({
      content:'Please Wait....'
    })
    const popover = this.popCtrl.create(ShoppingListOptionsPage);
    popover.present({ ev: event });
    popover.onDidDismiss(
      data => {
        if(!data) {
          return;
        }
        if (data.action == 'load') {
          loading.present();
          this.authService.getActiveUser().getIdToken()
            .then(
              (token: string) => {
                this.recipesService.fetchlist(token)
                  .subscribe( 
                    (list: Recipe[]) => {
                      loading.dismiss();
                      if (list) {
                        this.recipes = list;
                      } else {
                        this.recipes = [];
                      }
                    },
                    error => {
                      loading.dismiss();
                      this.handleError(error.message)
                    }
                  )
              })
        } else if(data.action == 'store'){
          loading.present();
          this.authService.getActiveUser().getIdToken()
            .then(
              (token: string) => {
                this.recipesService.storeList(token)
                  .subscribe(
                    () => loading.dismiss(),
                    error => {
                      loading.dismiss();
                      this.handleError(error.message)
                    }
                  )
              }
            )
        }
      }
    )
  }
 
  private handleError(error:string) {
    let alert = this.alertCtrl.create({
      title:'An Error Occured',
      message:error,
      buttons: ['Ok']
    })
    alert.present();
  }
}
