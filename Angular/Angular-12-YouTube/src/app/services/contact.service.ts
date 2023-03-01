import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Contact } from '../interfaces/contact';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient, private utilsService: UtilsService) { }

  getAllContacts(): Observable<Contact[]> {
    let dataUrl: string = 'http://localhost:5000/contacts'
    return this.httpClient.get<Contact[]>(dataUrl).pipe(
      catchError(this.utilsService.handleError)
    );
  }
}
