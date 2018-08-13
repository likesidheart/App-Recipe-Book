import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import firebase from 'firebase';
import { AuthService } from '../services/auth.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage
  signinPage = SigninPage
  signupPage = SignupPage
  isAuthenticated = false;
  @ViewChild('nav') nav: NavController

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController,
    private authService: AuthService) {
    firebase.initializeApp({
      apiKey: "AIzaSyBV0O4anpBSVnfqnRs0D0gdLT0qDDgT9yY",
      authDomain: "ionic-recipebook-40225.firebaseapp.com"
    })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated = true;
        this.rootPage = TabsPage
      } else {
        this.isAuthenticated = false
        this.rootPage = SigninPage
      }
    })
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }
  onLogout() {
    this.authService.logout();
    this.menuCtrl.close()
  }
}

