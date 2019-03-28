import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';

import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email = '';
  password = '';
  loading;
  constructor(private authService: AuthenticationService,
    public afAuth: AngularFireAuth,
    public alertController: AlertController,
    public router: Router,
    public loadingController: LoadingController) { }

  ngOnInit() {
  }
  async login() {
    const { email, password } = this;
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      if (res.user) {
        this.authService.setUser({
          email,
          uid: res.user.uid,
        });
        this.authService.authenticationState.next(true);
      }
    } catch (err) {
      this.presentAlert('Promiss', err);
    }
  }
  async presentAlert(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentLoadingWithOptions() {
    this.loading = await this.loadingController.create({
     spinner: null,
     message: 'Please wait...',
     translucent: true,
     cssClass: 'custom-class custom-loading'
   });
   return await this.loading.present();
 }
}
