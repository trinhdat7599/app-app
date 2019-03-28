import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/main',
      icon: 'home'
    },
    {
      title: 'Cart',
      url: '/total',
      icon: 'cart'
    },
    {
      title: 'AddCard',
      url: '/admin',
      icon: 'person'
    }
  ];
  imagedata;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    private router: Router,
    private camera: Camera
  ) {
    this.initializeApp();
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate([ 'main']);
        } else {
          this.router.navigate(['login']);
        }
      });
    });
  }
}
