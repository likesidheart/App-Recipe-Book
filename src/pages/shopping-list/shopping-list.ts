import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { NgForm } from '../../../node_modules/@angular/forms';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Ingredient } from '../../models/ingredient';
import { ShoppingListOptionsPage } from './shopping-list-options/shopping-list-options';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  listItems: Ingredient[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private slService: ShoppingListService,
  private popCtrl:PopoverController,private authService:AuthService) {
  }
  ionViewWillEnter() {
    this.loadItems();
  }

  onAddItem(form: NgForm) {
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }
  onShowOptions(event:MouseEvent) {
    const popover = this.popCtrl.create(ShoppingListOptionsPage);
    popover.present({ev:event});
    popover.onDidDismiss(
      data => {
        if(data.action == 'load') {

        } else {
          this.authService.getActiveUser().getIdToken()
          .then(
            (token:string)=>{
              this.slService.storeList(token)
              .subscribe(
                () => console.log('Success'),
                error => {
                  console.log(error);
                }
              )
            }
          )
        }
      }
    )
  }
  
  private loadItems() {
    this.listItems = this.slService.getItems();
  }
  onDelete(index:number) {
      this.slService.removeItem(index);
      this.loadItems();
  }

}
