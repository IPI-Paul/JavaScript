import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-username',
  templateUrl: './change-username.component.html',
  styleUrls: ['./change-username.component.css']
})
export class ChangeUsernameComponent implements OnInit {
  @Input() getExample: string = '';
  username: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  updateInput(event: any): void {
    this.username = event.target.value;
  }
}
