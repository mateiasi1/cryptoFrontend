import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLogin } from 'src/Login/userLogin.component';
import { AuthService } from 'src/app/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  debugger;
  password = '';
  token: string;

  // tslint:disable-next-line: max-line-length

  public userLogin: UserLogin = {Username: this.username, Password: this.password, Token: this.token};
  constructor(private http: HttpClient,
    public authService: AuthService) { }
  ngOnInit() {

  }

  loginUser() {
    this.http.post('https://localhost:44384/api/Logins', this.userLogin).subscribe((responseData: UserLogin) => {
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




