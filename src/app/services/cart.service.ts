import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
export interface Todo {
  code: string;
  name: string;
  pirce: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})

export class CartService {

  mainuser: AngularFirestoreCollection<Todo>;
  sub;
  items: Observable<Todo[]> ;

  constructor(private afs: AngularFirestore) {
    this.mainuser = this.afs.collection<Todo>('products');
    this.items = this.mainuser.valueChanges();
   }
   private cart = [];
  getProducts() {
    return this.items;
  }
  getCart() {
    return this.cart;
  }
  addProduct(product) {
    this.cart.push(product);
  }
}
