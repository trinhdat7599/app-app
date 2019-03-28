import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Observable } from 'rxjs';
import { Events, MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { AngularFirestore } from '@angular/fire/firestore';


export interface Todo {
  code: string;
  name: string;
  pirce: string;
  image: string;
}
export interface Category {
  code: string;
  categoryname: string;
  expanded: boolean;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})

export class MainPage implements OnInit {
  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };
  cart = [];
  items: Observable<Todo[]> ;
  categoryname: Observable<Category[]>;


  encodeData: any;
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;
  uidbar;

  constructor( private cartService: CartService,
    private router: Router,
    private categoryService: CategoryService,
    events: Events,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private barcodeScanner: BarcodeScanner,
    private menu: MenuController,
    private afs: AngularFirestore) {
      this.barcodeScannerOptions = {
        showTorchButton: true,
        showFlipCameraButton: true
      };
      this.encodeData = 'https://www.FreakyJolly.com';
  }
  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedData = barcodeData;
      this.uidbar = this.scannedData['text'];
      this.afs.doc(`products/${this.uidbar}`).valueChanges().subscribe(product => {
        this.addToCart(product);
      });
    }).catch(err => {
      console.log('Error', err);
    });
  }
  encodedText() {
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodeData).then((encodedData) => {
      console.log(encodedData);
      this.encodeData = encodedData;

    }, (err) => {
      console.log('Error occured : ' + err);
    });
  }



  ngOnInit() {
    this.items = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
    this.categoryname = this.categoryService.getCategoryName();
  }
  addToCart(product) {
    this.cartService.addProduct(product);
    console.log(product);
  }
  openCart() {
    this.router.navigate(['total']);
  }
}
