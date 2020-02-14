import { PasswordSet } from './passwordSet.component';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLogin } from 'src/Login/userLogin.component';
import { AuthService } from 'src/app/auth-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-setpassword',
  templateUrl: './SetPassword.component.html',
  styleUrls: ['./SetPassword.component.css']
})
export class SetPasswordComponent implements OnInit {
  password = '';
  passwordConfirmation = '';

  setPasswordForm: FormGroup;

  // tslint:disable-next-line: max-line-length

  public passwordSet: PasswordSet = {Password: this.password};
  constructor(private http: HttpClient) {
      this.setPasswordForm = new FormGroup({
        password: new FormControl('', [Validators.required]),
        passwordConfirmation: new FormControl('', [Validators.required])
      });
    }
  ngOnInit() {
  }
  onSubmit() {
    if (this.setPasswordForm.valid) {
      console.log(this._v());
      console.log(this.setPasswordForm.controls['password'].value);
    }
  }
  _v() {
    return this.setPasswordForm.value;
  }

  setPassword() {
    this.http.put( 'https://localhost:44384/api/users/setPassword, ', this.passwordSet).subscribe(responseData => {
    // tslint:disable-next-line: no-debugger
    debugger;
    console.log(responseData);
  });
  }
}




