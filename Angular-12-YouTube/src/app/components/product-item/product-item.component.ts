import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  product: Product = {
    sno: 'AA101',
    name: 'Mi Watch',
    image: 'http://localhost:8080/Pictures/pi.png',
    qty: 2,
    price: 1500
  }

  constructor() { }

  ngOnInit(): void {
  }

  incrementQty(): void {
    this.product = {
      ...this.product,
      qty: this.product.qty + 1
    }
  }

  decrementQty(): void {
    this.product = {
      ...this.product,
      qty: this.product.qty - 1 > 0 ? this.product.qty - 1 : 1
    }
  }
}
