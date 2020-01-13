import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class AuthService {
  public isLoggedIn = false;
  constructor(public jwtHelper: JwtHelperService) {}
  // ...
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('currentUser');
    if (token == null) {
        return false;
        } else {
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
        }
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
}
