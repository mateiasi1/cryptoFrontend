import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { environment } from 'src/environments/environment';
import { UserLogin } from './userLogin.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
 
  token: string;
  loginForm: FormGroup;
  environmentURL = environment.apiUrl;
  // tslint:disable-next-line: max-line-length

  constructor(private formBuilder: FormBuilder, private http: HttpClient, public authService: AuthService, public router: Router, public loginService: LoginService) {
   this.createLoginForm();
  }
  ngOnInit() {
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  loginUser() {
    // tslint:disable-next-line:max-line-length
    const userLogin: UserLogin = { Username: this.loginForm.value.username, Password: this.loginForm.value.password, Token: this.token, Role: this.token};
    console.log(this.environmentURL);
    this.http.post(this.environmentURL + 'Logins/authenticate', userLogin).subscribe((responseData: UserLogin) => {
      console.log(responseData, 'login');
      console.log(this.loginForm.value);
      if (responseData != null) {
        this.authService.isLoggedIn = true;
        localStorage.setItem('currentUser', JSON.stringify({ token: responseData, name: userLogin.Username }));
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

  onSubmit() {
    this.loginUser();
  }
}

