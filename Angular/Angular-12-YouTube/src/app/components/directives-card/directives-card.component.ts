import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-directives-card',
  templateUrl: './directives-card.component.html',
  styleUrls: ['./directives-card.component.css']
})
export class DirectivesCardComponent implements OnInit {
  @Input() getExample: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
