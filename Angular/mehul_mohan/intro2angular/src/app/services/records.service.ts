import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { objData } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {

  }

  getData() {
    return this.http.get<objData>(`${this.apiUrl}/php/online.php/obj`);
  }
}
