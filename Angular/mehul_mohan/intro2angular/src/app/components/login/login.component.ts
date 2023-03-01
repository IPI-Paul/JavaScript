import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  loginUser(event: any) {
    event.preventDefault();
    const target = event.target;
    const username = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;
    const session_id = event.target.ownerDocument.cookie.split("=")[1];    
    

    this.authService.getUserDetails(username, password, session_id)
    .subscribe(data => {
      if (data.success) {
        this.router.navigate(['dashboard']);
        this.authService.setLoggedIn(true);
      } else {
        alert(data.message);
        this.router.navigate(['admin']);
      }
    });
  }
}
