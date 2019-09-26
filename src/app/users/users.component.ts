import { Component, OnInit } from '@angular/core';
import { UserCreate } from './userCreate.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLogin } from './userLogin.component';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  username = '';
  debugger;
  password = '';

  // tslint:disable-next-line: max-line-length

  public userLogin: UserLogin = {Username: this.username, Password: this.password};
  constructor(private http: HttpClient,
    public authService: AuthService) { }
  ngOnInit() {

  }

  loginUser() {
    this.http.post( 'https://localhost:44384/api/logins', this.userLogin).subscribe(responseData => {
    // tslint:disable-next-line: no-debugger
    console.log(responseData, 'login');
    if (responseData === true ) {
      this.authService.login();
    } else {
      this.authService.logout();
    }
  });

  }

}
