import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { DbUser } from '../interfaces/db-user';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private utilsService: UtilsService) {}

  getUsers(getExample: string): Observable<DbUser[]> {
    let dataUrl: string = 'http://localhost:5000/users';
    if(getExample == 'Observable') {
      return this.httpClient.get<DbUser[]>(dataUrl);
    } else {
      dataUrl += 's';
      return this.httpClient.get<DbUser[]>(dataUrl).pipe(
        catchError(this.utilsService.handleError)
      );
    }
  }
}
