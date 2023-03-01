import { Component, OnInit } from '@angular/core';
import { Product, Products } from 'src/app/interfaces/product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  products: Product[] = Products;

  constructor() { }

  ngOnInit(): void {
  }

  calcGrandTotal(): number {
    let total: number = 0;
    for(let product of this.products) {
      total += (product.qty * product.price);
    }
    return total;
  }

  incrQty(productId: string): void {
    this.products = this.products.map((product: Product) => {
      if(product.sno === productId) {
        return {
          ...product,
          qty: product.qty + 1
        }
      }
      return product;
    })
  }

  decrQty(productId: string): void {
    this.products = this.products.map((product: Product) => {
      if(product.sno === productId) {
        return {
          ...product,
          qty: product.qty - 1 > 0 ? product.qty - 1 : 1
        }
      }
      return product;
    })
  }
}
