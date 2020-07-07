import { AuthService } from './auth-service';
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorServiceService implements HttpInterceptor{

constructor(private injector: Injector) { }

intercept(req, next) {
  const authService = this.injector.get(AuthService);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  let currentToken;
  if(currentUser) {
    currentToken = currentUser.token.token;
  } else {
    currentToken = '';
  }

  const tokenizedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${currentToken}`
    }
  });
  return next.handle(tokenizedReq);
}
}
