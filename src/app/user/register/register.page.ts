import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from '../../services/authentication.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  password = '';
  cpassword = '';
  address = '';
  name = '';
  callnumber = '';
  email = '';
  constructor(
    public afAuth: AngularFireAuth,
    public afstore: AngularFirestore,
    public user: AuthenticationService,
    public alertController: AlertController,
    public router: Router
  ) { }

  ngOnInit() {
  }
  async presentAlert(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    });

    await alert.present();
  }
  async register() {
    const { password, cpassword, name, callnumber, address, email } = this;
    if (password !== cpassword) {
      return console.error('Passwords dont match');
    }

    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);

      this.afstore.doc(`users/${res.user.uid}`).set({
        name,
        callnumber,
        address,
        email
      });

      this.user.setUser({
        email,
        uid: res.user.uid,
      });
      this.presentAlert('Success', 'You are registered!');
      this.router.navigate(['/login']);

    } catch ( error) {
      console.dir(error);
      this.presentAlert('Promiss', error);
    }
  }

}
