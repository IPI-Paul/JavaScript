import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Country, Region } from '../interfaces/country';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private httpClient: HttpClient, private utils: UtilsService) { }

  public getAllCountries(): Observable<Country[]> {
    let dataUrl: string = 'http://localhost:5000/countries';
    return this.httpClient.get<Country[]>(dataUrl).pipe(
      catchError(this.utils.handleError)
    );
  }

  public getAllRegions(): Observable<Region[]> {
    let dataUrl: string = 'http://localhost:5000/regions';
    return this.httpClient.get<Region[]>(dataUrl).pipe(
      catchError(this.utils.handleError)
    );
  }
}
