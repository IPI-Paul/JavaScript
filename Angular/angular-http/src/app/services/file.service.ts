import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  downloadFile(): Observable<HttpResponse<Blob>> {
    return this.http.get('assets/txt/lorem-ipsum.tx', {
      responseType: 'blob',
      observe: 'response'
    })
  }

  getTextFile(): Observable<string> {
    return this.http.get('assets/txt/lorem-ipsum.txt', {
      responseType: 'text'
    });
  }

  uploadFiles(formData: FormData): Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(`http://localhost:4200/assets/uploads/`, 
    formData,
    {
      observe: 'events', reportProgress: true
    });
  }
}
