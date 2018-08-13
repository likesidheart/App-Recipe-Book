import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '../../../node_modules/@angular/forms';
import { AuthService } from '../../services/auth.service';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {


  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService,private loadingCtrl:LoadingController,
  private alertCtrl:AlertController) {
  }

  onSignup(form: NgForm) {
    let loading = this.loadingCtrl.create({
      content:'Signing you up...'
    })
    loading.present();
    this.authService.signup(form.value.email,form.value.password)
    .then(data => {
      loading.dismiss();
    })
    .catch(error => {
      loading.dismiss();
      let alert = this.alertCtrl.create({
        title:'Signup failed!',
        message: error.message,
        buttons: ['Ok']
      })
      alert.present();
    })
  }

}
