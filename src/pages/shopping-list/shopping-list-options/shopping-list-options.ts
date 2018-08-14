import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ShoppingListOptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-list-options',
  templateUrl: `
  <ion-grid text-center>
    <ion-row>
        <ion-col>
            <h3>Store & Load</h3>
        </ion-col>
    </ion-row>
    <ion-row>
        <ion-col>
            <button ion-button outline (click)="onAction('load')">Load List</button>
        </ion-col>
    </ion-row>
    <ion-row>
        <ion-col>
            <button ion-button outline (click)="onAction('store')">Save List</button>
        </ion-col>
    </ion-row>
</ion-grid>
  `,
})
export class ShoppingListOptionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl:ViewController) {
  }

  onAction(action:string) {
    this.viewCtrl.dismiss({action:action});
}

}
