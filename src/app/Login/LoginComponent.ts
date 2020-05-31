import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { UserLogin } from '../components/userLogin.component';
import { LoginService } from '../services/login.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  debugger;
  password = '';
  token: string;
  loginForm: FormGroup;
  environmentURL = environment.apiUrl;
  // tslint:disable-next-line: max-line-length
  public userLogin: UserLogin = { Username: this.username, Password: this.password, Token: this.token, Role: this.token };
  constructor(private http: HttpClient, public authService: AuthService, public router: Router, public loginService: LoginService) {
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
      console.log(this.loginForm.controls.email.value);
    }
  }
  _v() {
    return this.loginForm.value;
  }
  loginUser() {
    // tslint:disable-next-line:max-line-length
    console.log(this.environmentURL);
    this.http.post(this.environmentURL + 'Logins/authenticate', this.userLogin).subscribe((responseData: UserLogin) => {
      console.log(responseData, 'login');
      console.log(this.loginForm.value);
      if (responseData != null) {
        this.authService.isLoggedIn = true;
        localStorage.setItem('currentUser', JSON.stringify({ token: responseData, name: this.userLogin.Username }));
        if (this.authService.getRole === 'admin') {
          this.router.navigate(['portal/users-management']);
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
