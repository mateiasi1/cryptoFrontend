import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserCreate } from 'src/Login/userCreate.component';


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
    debugger;
    this.http.post( 'https://localhost:44384/api/registerusers', this.defaultAdmin).subscribe(responseData => {
    // tslint:disable-next-line: no-debugger
 debugger;
    console.log(responseData);
  });
  }
  postUser() {
    this.http.post( 'https://localhost:44384/api/registerusers', this.userCreate).subscribe(responseData => {
    // tslint:disable-next-line: no-debugger
    debugger;
    console.log(responseData);
  });
  }

}
