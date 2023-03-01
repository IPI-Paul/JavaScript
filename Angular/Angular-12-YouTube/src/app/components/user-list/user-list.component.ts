import { Component, Input, OnInit } from '@angular/core';
import { DbUser } from 'src/app/interfaces/db-user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input() getExample: string = '';
  users: DbUser[] = [] as DbUser[];
  errorMessage: string | undefined = undefined;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  ngOnChanges():void {
    this.users = [] as DbUser[];
  }

  getUsersData(): void {
    this.userService.getUsers(this.getExample).subscribe((data) => {
      this.errorMessage = undefined;
      this.users = data;
    }, (error) => {
      this.errorMessage = error;      
    });
  }
}
