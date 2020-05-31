import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLogin } from 'src/app/Login/userLogin.component';
import { AuthService } from 'src/app/auth-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from './login.service';

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

  loginForm: FormGroup;

  // tslint:disable-next-line: max-line-length

  public userLogin: UserLogin = {Username: this.username, Password: this.password, Token: this.token, Role: this.token};
  constructor(private http: HttpClient,
    public authService: AuthService,
    public router: Router,
    public loginService: LoginService) {
      this.loginForm = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
      });
    }
  ngOnInit() {
// this.authService.isAuthenticated();
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.loginUser();
      console.log(this._v());
      console.log(this.loginForm.controls['email'].value);
    }
  }
  _v() {
    return this.loginForm.value;
  }
  loginUser() {
    // tslint:disable-next-line:max-line-length
    this.http.post('https://localhost:44384/api/Logins/authenticate', this.userLogin).subscribe((responseData: UserLogin) => {
    console.log(responseData, 'login');
    console.log(this.loginForm.value);
    if (responseData != null ) {
      this.authService.isLoggedIn = true;
      localStorage.setItem('currentUser', JSON.stringify({token: responseData, name: this.userLogin.Username}));
      if (this.authService.getRole === 'admin') {
        this.router.navigate(['portal/userManagement']);
      } else {
        this.router.navigate(['portal/bank-account']);
      }
    }
  });

  }

  logoutUser() {

      this.loginService.logoutUser();
  }
}




