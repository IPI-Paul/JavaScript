import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private errors: string[] = [];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  registerUser(event: any) {
    event.preventDefault();
    const target = event.target;
    const username = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;
    const cpassword = target.querySelector('#cpassword').value;

    if (password != cpassword) {
      this.errors.push("Passwords do not match")
    }

    // more validation
    if (this.errors.length === 0) {
      this.authService.registerUser(username, password)
      .subscribe(data => {
        console.log(data);
        if(data.success) {
          this.router.navigate(['dashboard']);
        }
      });
    } else {
      window.alert("Passwords do not match!");
      this.errors = [];
    }

    // this.authService.getUserDetails(username, password, session_id)
    // .subscribe(data => {
    //   if (data.success) {
    //     this.router.navigate(['admin']);
    //     this.authService.setLoggedIn(true);
    //   } else {
    //     alert(data.message);
    //     this.router.navigate(['admin']);
    //   }
    // });
  }
}
