import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { NgForm } from '../../../node_modules/@angular/forms';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Ingredient } from '../../models/ingredient';
import { ShoppingListOptionsPage } from './shopping-list-options/shopping-list-options';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  listItems: Ingredient[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private slService: ShoppingListService,
  private popCtrl:PopoverController) {
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
  }
  
  private loadItems() {
    this.listItems = this.slService.getItems();
  }
  onDelete(index:number) {
      this.slService.removeItem(index);
      this.loadItems();
  }
}
