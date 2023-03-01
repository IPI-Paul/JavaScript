import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-forms-card',
  templateUrl: './forms-card.component.html',
  styleUrls: ['./forms-card.component.css']
})

export class FormsCardComponent implements OnInit {
  @Input() getExample: string = '';

  constructor() { }

  ngOnInit(): void {
  }
}
