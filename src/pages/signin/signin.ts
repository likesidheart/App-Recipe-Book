import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '../../../node_modules/@angular/forms';
import { AuthService } from '../../services/auth.service';


@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private authService:AuthService,private loadingCtrl:LoadingController,
  private alertCtrl:AlertController) {
  }
  onSignin(form:NgForm) {
    let loading = this.loadingCtrl.create({
      content:'Logging in.....'
    })
    loading.present();
    this.authService.signin(form.value.email,form.value.password)
    .then(data => {
      loading.dismiss();
    })
    .catch(error => {
      loading.dismiss();
      let alert = this.alertCtrl.create({
        title:'Signin failed!',
        message: error.message,
        buttons: ['Ok']
      })
      alert.present();
    })
  }
}
