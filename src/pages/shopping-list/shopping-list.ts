import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '../../../node_modules/@angular/forms';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Ingredient } from '../../models/ingredient';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  listItems: Ingredient[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private slService: ShoppingListService) {
  }
  ionViewWillEnter() {
    this.loadItems
  }

  onAddItem(form: NgForm) {
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }
  
  private loadItems() {
    this.listItems = this.slService.getItems();
  }
}
