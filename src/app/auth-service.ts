import { Injectable, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService implements OnInit {
  public isLoggedIn = false;
  constructor(public jwtHelper: JwtHelperService) {}
  // ...
  ngOnInit() {
this.isAuthenticated();
  }
  public isAuthenticated(): boolean {
    const token = JSON.parse(localStorage.getItem('currentUser'));
    const currentToken = token.token.token;
     this.isLoggedIn = true;
     return true;
  }
public get getName(): string {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const currentRole = currentUser.name;
  return currentRole;
}
  public get getRole(): string {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const currentRole = currentUser.token.role;
    return currentRole;
  }

  public get isAdmin(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const currentRole = currentUser.token.role;
    if (currentRole === 'admin') {
      return true;
    }
    return false;
  }
  public getToken() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser == null || currentUser.token) {
      return null;
    }
    const currentToken = currentUser.token.token;
    return currentToken;
  }
}
