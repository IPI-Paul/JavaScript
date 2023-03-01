import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';
    if(error.status === 0) {
      // A client-side or network error occured. Handle it accordningly.
      // console.error('An error occured: ', error.error);      
      errorMessage = `An error occured: ${JSON.stringify(error.error)}`
    } else {
      /* The backend returned an unsuccessful response code.
      The response body may contain clues as to what went wrong. */
      // console.error(
      //   `Backend returned code ${error.status}, body was: `, error.error
      // );
      errorMessage = `Backend returned code ${error.status}, body was: 
        ${JSON.stringify(error.error)}.  `      
    }
    // Return a observable with a user-facing error message.
    errorMessage += 'Something bad happened; please try again later.'
    return throwError(
      () => new Error(errorMessage)
      )
  }
}
