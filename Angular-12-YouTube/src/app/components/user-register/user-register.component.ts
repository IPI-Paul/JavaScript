import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  user: User = {
    name: '',
    email: '',
    password: '',
    designation: '',
    bio: '',
    terms: false
  }

  constructor() { }

  ngOnInit(): void {
  }

  submitRegister(): void {
    console.log(this.user);
    
  }
}
