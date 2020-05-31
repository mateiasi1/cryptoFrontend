import { Component, OnInit } from '@angular/core';
import { Password } from '../components/Password.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordSet } from '../components/passwordSet.component';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {

  environmentURL = environment.apiUrl;
  password = '';
  passwordConfirmation = '';
  public SetPassword = new Password();

  setPasswordForm: FormGroup;

  // tslint:disable-next-line: max-line-length

  public passwordSet: PasswordSet = {Password: this.password};
  constructor(private http: HttpClient, private route: ActivatedRoute) {
      this.setPasswordForm = new FormGroup({
        password: new FormControl('', [Validators.required]),
        passwordConfirmation: new FormControl('', [Validators.required]),
      });
    }
  ngOnInit() {
    this.SetPassword.Token = this.route.snapshot.paramMap.get('token');
    console.log(this.SetPassword.Token);
  }
  onSubmit() {
    if (this.setPasswordForm.valid) {
      console.log(this._v());
      // tslint:disable-next-line:no-string-literal
      console.log(this.setPasswordForm.controls['password'].value);
      this.setPassword();
    }
  }
  _v() {
    return this.setPasswordForm.value;
  }

  setPassword() {
    this.SetPassword.Password = this.passwordSet.Password;
    this.http.put(this.environmentURL + 'users/setPassword', this.SetPassword).subscribe(responseData => {
    // tslint:disable-next-line: no-debugger
    debugger;
    console.log(responseData);
  });
  }
}
