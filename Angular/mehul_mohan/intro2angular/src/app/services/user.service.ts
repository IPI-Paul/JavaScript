import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment, updatables } from 'src/environments/environment';
import { Auth, isLoggedIn, logoutStatus, quoteStatus, userData } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient, private store: Store<any>) { }

  getAllState() {
    return this.store.select('appReducer');
  }
  
  getData() {
    return this.httpClient.get<userData>('/api/data');
  }

  getSomeData() {
    return this.httpClient.get<Auth>(`${this.apiUrl}/php/database.php`, {
      withCredentials: true
    });
  }

  isLoggedIn(): Observable<isLoggedIn> {
    let url = '';
    if(updatables.server === 'php') {
      url = `${this.apiUrl}/php/isloggedin.php`
    } else {
      url = '/api/isloggedin';
    }
    return this.httpClient.get<isLoggedIn>(url, {
      withCredentials: true
    });
  }

  logout() {
    let url = '';
    if(updatables.server === 'php') {
      url = `${this.apiUrl}/php/logout.php`
    } else {
      url = '/api/logout';
    }
    return this.httpClient.get<logoutStatus>(url, {
      withCredentials: true
    });
  }

  updateQuote(quote: any) {
    return this.httpClient.post<quoteStatus>('/api/quote', {
      quote
    });
  }
}
