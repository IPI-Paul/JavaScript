import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TestInterceptor implements HttpInterceptor {

  constructor() {}
  
  /* Good place for
    catching errors
    cache data
    alter output/input
  */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const API_TOKEN = 'HisVerySecretTokenString';
    const requestCopy = request.clone({
      setHeaders: {API_KEY: API_TOKEN}, // if no Key given then variable name used as key name
      body: {hello: 'world'}
    });
    console.log(requestCopy);
    
    return next.handle(requestCopy);
  }
}
