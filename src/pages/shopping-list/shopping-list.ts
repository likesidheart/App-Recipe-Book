import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, AlertController } from 'ionic-angular';
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
    private popCtrl: PopoverController, private authService: AuthService,private loadingCtrl:LoadingController,
  private alertCtrl:AlertController) {
  }
  ionViewWillEnter() {
    this.loadItems();
  }

  onAddItem(form: NgForm) {
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }
  onShowOptions(event: MouseEvent) {
    let loading = this.loadingCtrl.create({
      content:'Please Wait....'
    })
    const popover = this.popCtrl.create(ShoppingListOptionsPage);
    popover.present({ ev: event });
    popover.onDidDismiss(
      data => {
        if (data.action == 'load') {
          loading.present();
          this.authService.getActiveUser().getIdToken()
            .then(
              (token: string) => {
                this.slService.fetchlist(token)
                  .subscribe( 
                    (list: Ingredient[]) => {
                      loading.dismiss();
                      if (list) {
                        this.listItems = list;
                      } else {
                        this.listItems = [];
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
                this.slService.storeList(token)
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

  private loadItems() {
    this.listItems = this.slService.getItems();
  }
  onDelete(index: number) {
    this.slService.removeItem(index);
    this.loadItems();
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
