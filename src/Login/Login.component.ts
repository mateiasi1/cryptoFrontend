import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLogin } from 'src/Login/userLogin.component';
import { AuthService } from 'src/app/auth-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  public userLogin: UserLogin = {Username: this.username, Password: this.password, Token: this.token};
  constructor(private http: HttpClient,
    public authService: AuthService) {
      this.loginForm = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
      });
    }
  ngOnInit() {
    this.authService.isAuthenticated();
  }
  onSubmit() {
    if(this.loginForm.valid) {
      console.log(this._v());
      console.log(this.loginForm.controls['email'].value);
    }
  }
  _v() {
    return this.loginForm.value;
  }
  loginUser() {
    this.http.post('https://localhost:44384/api/Logins/authenticate', this.userLogin).subscribe((responseData: UserLogin) => {
    console.log(responseData, 'login');
    console.log(this.loginForm.value);
    debugger;
    if (responseData != null ) {
      this.authService.isLoggedIn = true;
      localStorage.setItem('currentUser', JSON.stringify({token: responseData, name: this.userLogin.Username}));
    }
  });

  }

  logoutUser() {
    debugger;
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const token = currentUser.token.token;
      this.userLogin.Token = token;
      const userId = currentUser.token.id;
      debugger;
      return this.http.delete('https://localhost:44384/api/Logins/' + userId).subscribe(responseData => {
        this.authService.isLoggedIn = false;
        debugger;
        localStorage.clear();
      });
  }
}




