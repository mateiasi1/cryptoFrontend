import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/retry';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from '../_alert';

@Injectable({
  providedIn: 'root'
})
export class HttpClientWServiceService {

constructor(private httpClient: HttpClient,
            private alert: AlertService) { }

handleError(error: HttpErrorResponse) {
  let errorMessage = 'Unknown error!';
  if (error.error instanceof ErrorEvent) {
    // Client-side errors
    errorMessage = `Error: ${error.error.message}`;
  } else {
    // Server-side errors
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  window.alert(errorMessage);
  return throwError(errorMessage);
}

get(url: string) {
  return this.httpClient.get(url).pipe(catchError(this.handleError));
}

post(url: string, object: any) {
  return this.httpClient.post(url, object).pipe(catchError(this.handleError));
}

delete(url: string, object: any) {
  return this.httpClient.delete(url, object).pipe(catchError(this.handleError));
}

put(url: string, object: any) {
  return this.httpClient.put(url, object).pipe(catchError(this.handleError));
}
}
