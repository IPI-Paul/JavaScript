import { Component, Input, OnInit } from '@angular/core';
import { Product, Products } from 'src/app/interfaces/product';

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.css']
})
export class ShoppingCardComponent implements OnInit {
  @Input() getExample: string = '';
  products: Product[] = Products;

  constructor() { }

  ngOnInit(): void {
  }

}
