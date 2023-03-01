import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipe',
  templateUrl: './pipe.component.html',
  styleUrls: ['./pipe.component.css']
})
export class PipeComponent implements OnInit {
  title = 'Pipes';
  baseAmount: number = 101.25;
  isoCodes: string[] = ['EUR', 'GBP', 'INR', 'USD'];
  ISOCode: any = this.isoCodes[0];
  rates = {EUR: 1.1, GBP: 1, INR: 65, USD: 1.75}

  get amount() {
    return this.baseAmount * eval(`this.rates.${this.ISOCode}`);
  }

  get selCode() {
    return this.ISOCode;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
