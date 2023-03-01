import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-events-card',
  templateUrl: './events-card.component.html',
  styleUrls: ['./events-card.component.css']
})
export class EventsCardComponent implements OnInit {
  @Input() getExample: string = '';
  count: number = 0;
  message: string = 'Hello';

  constructor() { }

  ngOnInit(): void {
  }

  incrCounter(): void {
    this.count++;
  }

  decrCounter(): void {
    this.count = this.count-- > 0 ? this.count-- : 0;
  }

  updateMessage(msg: string): void {
    this.message = `Good ${msg}!`;
  }
}
