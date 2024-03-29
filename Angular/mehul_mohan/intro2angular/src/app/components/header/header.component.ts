import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  greetMessage = 'Hello Guest!';
  logout = false;
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllState().subscribe(state => {
      this.greetMessage = state.login ? "Hello " + state.user : "Guest";
    });
  }

}
