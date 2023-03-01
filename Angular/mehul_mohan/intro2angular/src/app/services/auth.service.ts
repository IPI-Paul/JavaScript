import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment, updatables } from 'src/environments/environment';
import { Auth, registerResponse } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = environment.apiUrl;
  private url: string = '';
  private loggedInStatus = false; //JSON.parse(localStorage.getItem('loggedIn') || 'false');

  constructor(private httpClient: HttpClient) { }

  get isLoggedIn() {
    return this.loggedInStatus;
    //return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString());
  }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
    //localStorage.setItem('loggedIn', 'true');
  }

  getUserDetails(username: string, password: string, session_id: string) {
    // post these details to API server and return user info if correct
    
    if(updatables.server === 'php') {
      this.url = `${this.apiUrl}/php/auth.php`;
    } else {
      this.url = '/api/login';
    }
    return this.httpClient.post<Auth>(this.url, {
      session_id,
      username,
      password
    });
    // .subscribe(data => {
    //   console.log(data, ' is what we got from the server');      
    // });
  }

  registerUser(username: string, password: string) {
    return this.httpClient.post<registerResponse>(`api/register`, {
      username,
      password
    });
  }
}
