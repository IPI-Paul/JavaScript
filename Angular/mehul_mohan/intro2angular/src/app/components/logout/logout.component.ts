import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private userService: UserService, 
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userService.logout().subscribe(data => {
      if (data.success) {
        this.router.navigate(['']);
        this.authService.setLoggedIn(false);
      } else {
        window.alert('Huston! We have a problem!')
      }
    });
  }

}
