import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/retry';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToasterService } from '../_alert/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class HttpClientWServiceService {

constructor(private httpClient: HttpClient,
            private toaster: ToasterService) { }

handleError(error: HttpErrorResponse) {
  let errorMessage = 'Unknown error!';
  if (error.error instanceof ErrorEvent) {
    // Client-side errors
    errorMessage = `Error: ${error.error.message}`;
  } else {
    // Server-side errors
    errorMessage = `Error Code: ${error.status}\nMessage: Server Error`;
    //errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  this.toaster.show('error', `Error Code: ${error.status}`, errorMessage);
  return throwError(errorMessage);
}

get(url: string) {
  return this.httpClient.get(url).pipe(catchError(error => (this.handleError(error))));
}

post(url: string, object: any) {
  return this.httpClient.post(url, object).pipe(catchError(error => (this.handleError(error))));
}

delete(url: string) {
  return this.httpClient.delete(url).pipe(catchError(error => (this.handleError(error))));
}

put(url: string, object: any) {
  return this.httpClient.put(url, object).pipe(catchError(error => (this.handleError(error))));
}
}
