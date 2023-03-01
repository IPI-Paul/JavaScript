import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.css']
})
export class DataCardComponent implements OnInit {
  public tourName: string = 'Paris';
  public tourImage: string = 'http://localhost:8080/Pictures/akonadiconsole.png';
  public time: string = new Date().toTimeString();
  interval: any;

  constructor() { 
    this.updateTime();
  }

  ngOnInit(): void {
  }

  public getDate(): string {
    return new Date().toLocaleDateString();
  }

  public getTime(): string {
    return new Date().toLocaleTimeString();
  }

  public updateTime(): void {
    this.interval = setInterval(() => {
      this.time = new Date().toLocaleTimeString();
    }, 1000);
  }
}
