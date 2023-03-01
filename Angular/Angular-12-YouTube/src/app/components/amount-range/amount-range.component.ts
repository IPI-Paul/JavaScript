import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-amount-range',
  templateUrl: './amount-range.component.html',
  styleUrls: ['./amount-range.component.css']
})
export class AmountRangeComponent implements OnInit {
  amount?: number;

  constructor() { }

  ngOnInit(): void {
  }

}
