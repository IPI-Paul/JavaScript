import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-password',
  templateUrl: './show-password.component.html',
  styleUrls: ['./show-password.component.css']
})
export class ShowPasswordComponent implements OnInit {
  inputType: string = 'password';

  constructor() { }

  ngOnInit(): void {
  }

  showPassword(event: any): void {
    this.inputType = event.target.checked ? 'text' : 'password';
  }
}
