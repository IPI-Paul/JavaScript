import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { map, Observable, tap, retry, catchError, of, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  readonly moreParams = ['test1', 'test2'];
  readonly defaultImage = environment.apiUrl.replace('5000', '4200');

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }

  // Returns everything including JSON
  getEvents(): Observable<HttpEvent<User[]>> { 
    let obs = this.http.get<User[]>(`${this.apiUrl}/users`, {
      observe: 'events',
      reportProgress: true
    });
    obs.subscribe(
      (response) => console.log(response),
      (error: any) => console.error(error),
      () => console.log('Done getting events')
    );
    return obs;
  }

  getHeader(): Observable<User[]> {
    let myHeaders = new HttpHeaders({
      myheader: 'headervalue' // or an array ['headervalue', 'headervalue2']
    });
    myHeaders = myHeaders.set('id', '1234');
    myHeaders = myHeaders.append('id', '000');

    return this.http.get<User[]>(`${this.apiUrl}/users`, {headers: myHeaders});
  }

  getHeaders(): Observable<User[]> {
    let myHeaders = new HttpHeaders({
      myheader: ['headervalue', 'headervalue2']
    });
    myHeaders = myHeaders.set('id', '1234');
    myHeaders = myHeaders.append('id', '000');

    return this.http.get<User[]>(`${this.apiUrl}/users`, {headers: myHeaders});
  }

  getParams(): Observable<User[]> {
    let myParams = new HttpParams().set('page', '5').set('sort', 'true');
    myParams = myParams.append('name', 'junior');
    myParams = myParams.append('name', 'john');
    return this.http.get<User[]>(`${this.apiUrl}/users`, {params: myParams});
  }

  getParamsObject(): Observable<User[]> {
    const theParams = {['testList']: this.moreParams};
    let myParams = new HttpParams({fromObject: theParams});
    return this.http.get<User[]>(`${this.apiUrl}/users`, {params: myParams});
  }

  getParamsString(): Observable<User[]> {
    let myParams = new HttpParams({fromString: 'name=Junior&id=58'});
    return this.http.get<User[]>(`${this.apiUrl}/users`, {params: myParams});
  }

  getUser(idx: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${idx}`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getUsersAdmin(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
      map(users => users.map(user => ({
        ...user,
        isAdmin: user.id === 10 ? true : false
      })))
    );
  }

  getUsersCatchError(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users000000`)
      .pipe(
        catchError((error:any) => {
          return of([]);
        })
    );
  }

  getUsersCatchThrow(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users000000`)
      .pipe(
        catchError(this.handleError)
    );
  }

  getUsersImage(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
      map(users => users.map(user => ({
        email: user.email,
        website: user.website,
        phone: user.phone,
        image: `${this.defaultImage}/assets/images/${user.username}.png`,
        username: user.username,
        name: user.name
      })))
    );
  }

  getUsersMap(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
      tap(users => console.log(users)),
      map(users => users.map(user => ({
        ...user,
        name: user.name.toUpperCase()
      })))
    );
  }

  getUsersRetry(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users000000`)
      .pipe(
        retry(3)
    );
  }

  getUsersTap(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
      tap(users => console.log(users)
      )
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 404) return throwError({
      code: 404, 
      message: "Page Not Found or File Not Found error"
    });
    return throwError(error);
  }

  patchUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/users/${user.id}`, user);
  }

  setUserAdmin(idx: number, isAdmin: boolean): Observable<User> {
    console.log(idx);
    
    return this.http.get<User>(`${this.apiUrl}/users/${idx}`)
      .pipe(
        map(user => {
          return {
            ...user,
            id: idx,
            isAdmin: isAdmin
          }
        })
      );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${user.id}`, user);
  }
}
