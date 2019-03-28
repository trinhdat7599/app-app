import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

import {CartService } from '../services/cart.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from '../services/authentication.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { EmailComposer } from '@ionic-native/email-composer/ngx';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})



export class MenuPage implements OnInit  {
  name = '';
  country = '';
  city = '';
  districts = '';
  callnumber = '';
  selectedItems = [];
  total = 0;
  email = '';
  constructor(
    public afAuth: AngularFireAuth,
    public afstore: AngularFirestore,
    public user: AuthenticationService,
    public alertController: AlertController,
    public router: Router,
    private emailComposer: EmailComposer,
    private cartService: CartService,
    private AuthService: AuthenticationService
  ) {
   }
   sendEmail() {
    const email = {
      to: this.email,
      attachments: [
      ],
      subject: 'Sản phẩm của bạn ',
      // tslint:disable-next-line:max-line-length
      body: '<table border=1 *ngFor="let item of selectedItems"> <tr><th>{{ item.count }}x {{ item.name }} - {{ item.price | currency:"USD":"symbol" }}</th><th>{{ (item.price * item.count) | currency:"USD":"symbol" }}</th><th>{{ total | currency:"USD":"symbol" }}</th></tr> </table>',
      isHtml: true
    };
    this.emailComposer.open(email);
  }
  ngOnInit() {
    this.email = this.AuthService.getUsername();
    const items = this.cartService.getCart();
    const selected = {};
    for (const obj of items) {
      if (selected[obj.id]) {
        selected[obj.id].count++;
      } else {
        selected[obj.id] = {...obj, count: 1};
      }
    }
    this.selectedItems = Object.keys(selected).map(key => selected[key]);
    this.total = this.selectedItems.reduce((a, b) => a + (b.count * b.pirce), 0);
  }

}
