import { Component, OnInit } from '@angular/core';
import { UserCreate } from '../users/userCreate.component';
import { UserLogin } from '../users/userLogin.component';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-registerUser',
  templateUrl: './registerUser.component.html',
  styleUrls: ['./registerUser.component.css']
})
export class RegisterUserComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  public userCreate: UserCreate = {Id: 0, Username: '', Password: '', ReferralId: '', Role: 'user', IsOver18: false};
  public defaultAdmin: UserCreate = {Id: 1, Username: 'admin', Password: 'admin', ReferralId: '', Role: 'admin', IsOver18: true};
  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.createDefaultAdmin();
  }
  createDefaultAdmin() {
    this.http.post( 'https://localhost:44384/api/registerusers', this.defaultAdmin).subscribe(responseData => {
    // tslint:disable-next-line: no-debugger
 debugger;
    console.log(responseData);
  });
  }
  postUser() {
    this.http.post( 'https://localhost:44384/api/users', this.userCreate).subscribe(responseData => {
    // tslint:disable-next-line: no-debugger
    debugger;
    console.log(responseData);
  });
  }

}
