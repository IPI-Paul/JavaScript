import { HttpEventType } from '@angular/common/http';
import { Interpolation, NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { count, Observable, Subscriber } from 'rxjs';
import { User } from './interfaces/user';
import { FileService } from './services/file.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'angular-http';
  users!: User[];
  textFile!: string;
  private user: any = {
    name: "Updated Junior",
    username: "Updated Junior",
    email: "Sincere@april.biz"
  }
  fileStatus = { status: '', percentage: 0};
  actions = [
    {name: "Create User", action: "onCreateUser"},
    {name: "Delete User", action: " onDeleteUser"},
    {name: "Get Text File", action: "onGetTextFile"},
    {name: "Get User", action: "onGetUser"},
    {name: "Get Users", action: "onGetUsers"},
    {name: "Get Users Admin", action: "onGetUsersAdmin"},
    {name: "Get Users Catch Error", action: "onGetUsersCatchError"},
    {name: "Get Users Catch and Throw Error", action: "onGetUsersCatchThrow"},
    {name: "Get Users Image", action: "onGetUsersImage"},
    {name: "Get Users Map", action: "onGetUsersMap"},
    {name: "Get Users Retry", action: "onGetUsersRetry"},
    {name: "Get Users Tap", action: "onGetUsersTap"},
    {name: "Patch User", action: "onPatchUser"},
    {name: "Set User Admin", action: "onSetUserAdmin", value: true},
    {name: "Unset User Admin", action: "onSetUserAdmin", value: false},
    {name: "Update User", action: "onUpdateUser"},
    {name: "Upload Files", action: "onUploadFile"},
  ]
  
  constructor(
    private userService: UserService, 
    private fileService: FileService
    ) {}

  ngOnInit(): void {}

  hasAdmins() {
    let isAdmin = this.users.find(x => x.isAdmin) || `${this.users.find(x => x.isAdmin)}` > '' ? true : false
    return isAdmin
  }

  onCreateUser(): void {
    this.user.id = null;
    this.userService.createUser(this.user).subscribe(
      (response) => {
        console.log(response);
        this.users = [];
        this.users.push(response);
      },
      (error: any) => console.error(error),
      () => console.log('Done creating user')
    );
  }

  onDeleteUser(): void {
    this.userService.deleteUser(this.user.id).subscribe(
      (response) => console.log('Response from delete: ', response),
      (error: any) => console.error(error),
      () => {
        console.log('Done deleting user');
        this.onGetUsers();
      }
    );
  }

  onGetTextFile(): void {
    this.fileService.getTextFile().subscribe(
      (response) => {
        console.log('Response: ', response);
        this.textFile = response;
      },
      (error: any) => console.error(error),
      () => console.log('Done getting text file')
    );
  }

  onGetUser(): void {
    this.userService.getUser(this.user.id || 1).subscribe(
      (response) => {
        console.log(response);
        this.users = [];
        this.users.push(response);
      },
      (error: any) => console.error(error),
      () => console.log('Done getting user')
    );
  }

  onGetUsers(): void {
    this.userService.getUsers().subscribe(
      (response) => {
        console.log(response);
        this.users = response;
      },
      (error: any) => console.error(error),
      () => console.log('Done getting users')
    );
  }

  onGetUsersAdmin(): void {
    this.userService.getUsersAdmin().subscribe(
      (response) => {
        console.log(response);
        this.users = response;
      },
      (error: any) => console.error(error),
      () => console.log('Done getting users admins')
    );
  }

  onGetUsersCatchError(): void {
    this.userService.getUsersCatchError().subscribe(
      (response) => {
        console.log(response);
        this.users = response;
      },
      (error: any) => console.error(error),
      () => console.log('Done getting users and catching errors')
    );
  }

  onGetUsersCatchThrow(): void {
    this.userService.getUsersCatchThrow().subscribe(
      (response) => {
        console.log(response);
        this.users = response;
      },
      (error: any) => console.error(error),
      () => console.log('Done getting users and catching and re-throwing errors')
    );
  }

  onGetUsersImage(): void {
    this.userService.getUsersImage().subscribe(
      (response) => {
        console.log(response);
        this.users = response;
      },
      (error: any) => console.error(error),
      () => console.log('Done getting users images')
    );
  }

  onGetUsersMap(): void {
    this.userService.getUsersMap().subscribe(
      (response) => {
        console.log(response);
        this.users = response;
      },
      (error: any) => console.error(error),
      () => console.log('Done mapping users')
    );
  }

  onGetUsersRetry(): void {
    this.userService.getUsersRetry().subscribe(
      (response) => {
        console.log(response);
        this.users = response;
      },
      (error: any) => console.error(error),
      () => console.log('Done retrying users')
    );
  }

  onGetUsersTap(): void {
    this.userService.getUsersTap().subscribe(
      (response) => {
        console.log(response);
        this.users = response;
      },
      (error: any) => console.error(error),
      () => console.log('Done tapping users')
    );
  }

  onPatchUser(): void {
    this.userService.patchUser(this.user).subscribe(
      (response) => {
        console.log(response);
        this.users = [];
        this.users.push(response);
      },
      (error: any) => console.error(error),
      () => console.log('Done patching user')
    );
  }

  onSetUserAdmin(idx: number, isAdmin: boolean): void {
    this.userService.setUserAdmin(idx, isAdmin).subscribe(
      (response) => {
        console.log(response);
        this.users = [];
        this.users.push(response);
      },
      (error: any) => console.error(error),
      () => console.log('Done setting user admin')
    );
  }

  onUpdateUser(): void {
    this.userService.updateUser(this.user).subscribe(
      (response) => {
        console.log(response);
        this.users = [];
        this.users.push(response);
      },
      (error: any) => console.error(error),
      () => console.log('Done updating user')
    );
  }

  onUploadFile(event: any): void {
    console.log(event.target.files);
    const formData = new FormData();
    if (event.target.files) {
      let idx: number = 0;
      let itx: number = 1;
      for(const file of event.target.files) {
        formData.append('files', file, file.name);
        setTimeout(() => {
          idx++;
          this.fileStatus.percentage = Math.round(100 * idx / event.target.files.length);
        }, 500 * itx);
        itx++;
      }    
      this.fileService.uploadFiles(formData).subscribe(
        (event) => {
          switch(event.type) {
            case HttpEventType.UploadProgress || HttpEventType.DownloadProgress:
              console.log(event);
              break;
            case HttpEventType.Response:
              console.log(event);
              break;
          }
        },
        (error: any) => console.error(error),
        () => console.log('Done uploading files')
      );
    }
    // this.fileService.uploadFiles().subscribe(
    //   (response) => this.fileStatus.percentage += 10,
    //   (error: any) => console.error(error),
    //   () => this.fileStatus.percentage = 100
    // );
  }

  runThis(event: any) {
    this.textFile = "";
    let isAdmin = this.actions.find(x => x.name === event.target.value)?.value;
    if (isAdmin === true || isAdmin === false) {
      eval(`this.${this.actions.find(x => x.name === event.target.value)?.action}(
        ${this.user.id}, ${isAdmin}
        )`);
    } else {
      eval(`this.${this.actions.find(x => x.name === event.target.value)?.action}()`);
    }
    event.explicitOriginalTarget.selectedIndex = 0;    
  }

  setId(idx: number) {
    this.user.id = idx;
    console.log(this.user.id);    
  }
}
