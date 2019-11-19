import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLogin } from 'src/Login/userLogin.component';
import { AuthService } from 'src/app/auth-service';
import { Guid } from 'guid-typescript';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { pluck, share, shareReplay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  debugger;
  password = '';
  token: Guid;

  // tslint:disable-next-line: max-line-length

  public userLogin: UserLogin = {Username: this.username, Password: this.password, Token: this.token};
  constructor(private http: HttpClient,
    public authService: AuthService) { }
  ngOnInit() {

  }

  loginUser() {
    const currentUser = JSON.parse(localStorage.getItem(this.userLogin.Username));
    debugger;
    if (currentUser != null) {
      const token = currentUser.token;
      this.userLogin.Token = token;
    }
    debugger;
    return this.http.post( 'https://localhost:44384/api/logins', this.userLogin).subscribe(responseData => {
    console.log(responseData, 'login');
    if (responseData != null ) {
      this.authService.login();
      localStorage.setItem('currentUser', JSON.stringify({token: responseData, name: this.userLogin.Username}));
    } else {
      this.authService.logout();
    }
  });

  }

  logoutUser() {
    debugger;
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const token = currentUser.token;
      this.userLogin.Token = token;
      debugger;
      return this.http.delete('https://localhost:44384/api/logins/' + token).subscribe(responseData => {
        this.authService.logout();
        debugger;
        localStorage.clear();
      });
  }
}




