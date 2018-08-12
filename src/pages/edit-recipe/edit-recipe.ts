import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '../../../node_modules/@angular/forms';
import { RecipesService } from '../../services/recipes.service';

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {
  mode = 'New';
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private actionSheetController: ActionSheetController,
    private alertController: AlertController,private toastController:ToastController,private recipesService:RecipesService) {
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initializeForm();
  }
  onSubmit() {
    let value = this.recipeForm.value;
    let ingredients = [];
    if(value.ingredients.length > 0) {
      ingredients = value.ingredients.map(name=>{
        return {name:name,amout:1}
      })
    }
    this.recipesService.addRecipe(value.title,value.description,value.difficulty,value.ingredients)
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }
  onManageIngredients() {
    let actionSheet = this.actionSheetController.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: 'Remove all Ingredients',
          role: 'destructive',
          handler: () => {
            let fArray:FormArray = <FormArray>this.recipeForm.get('ingredients');
            let len = fArray.length;
            if(len > 0) {
              for (let i = len - 1; i >= 0; i--){
                fArray.removeAt(i);
              }
              let toast = this.toastController.create({
                message:'All Ingredients were removed!',
                duration:2500,
                position:'bottom'
              })
              toast.present();
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
  private createNewIngredientAlert() {
    return this.alertController.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if (data.name.trim() == '' || data.name == null) {
              let toast = this.toastController.create({
                message:'Please enter a valid value!',
                duration:2500,
                position:'bottom'
              })
              toast.present();
              return;
            }
            (<FormArray>this.recipeForm.get('ingredients'))
              .push(new FormControl(data.name, Validators.required))
              let toast = this.toastController.create({
                message:'Item Added!!',
                duration:2500,
                position:'bottom'
              })
              toast.present();
          }
        }
      ]
    });
  }

  private initializeForm() {
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'difficulty': new FormControl('Medium', Validators.required),
      'ingredients': new FormArray([])
    })
  }
}
