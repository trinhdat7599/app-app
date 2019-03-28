import { Component, OnInit } from '@angular/core';
import {CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-total',
  templateUrl: './total.page.html',
  styleUrls: ['./total.page.scss'],
})
export class TotalPage implements OnInit {

  selectedItems = [];
  total = 0;
  constructor(
    private router: Router,
    private cartService: CartService) { }
  ngOnInit() {
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
  openDelivery() {
    this.router.navigate(['menu']);
  }

}
