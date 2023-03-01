import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-user',
  templateUrl: './auth-user.component.html',
  styleUrls: ['./auth-user.component.css']
})
export class AuthUserComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  login(): void {
    this.isLoggedIn = true;
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
