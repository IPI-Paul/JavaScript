import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { updatables } from 'src/environments/environment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  message: any = 'Loading...';
  username: any = 'Getting your username...';
  server: string = updatables.server;
  @Input() selServer: any = 'php';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if(updatables.server === 'php') {
      this.userService.getSomeData().subscribe(data => {
        this.message = data.message + ':';
        this.username = data.username;
        if (!data.success) {
          localStorage.removeItem('loggedIn');
        }
      });
    } else {
      this.userService.getData().subscribe(data => {
        if(data.status) {
          this.message = data.quote + ' by';
          this.username = data.username;
        } else {
          this.router.navigate(['logout']);
        }
      });
    }
  }

  updateQuote(event: any) {
    console.log(event);    
    const value = event.target.ownerDocument.body.querySelector('#myQuote').value;
    this.userService.updateQuote(value).subscribe(data => {
      if(data.success) {
        alert("Your quote was updated!");
      } else {
        alert(`Houston! We have a problem!\n\n${data.message}`);
      }
    });
  }
  updateServer() {
    this.server = updatables.server;
  }
}
