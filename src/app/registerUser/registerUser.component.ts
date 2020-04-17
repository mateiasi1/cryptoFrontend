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
  public userCreate: UserCreate = {Id: 0, Username: '', Email: '', ReferralId: '', Role: '', IsOver18: false};
  // tslint:disable-next-line: max-line-length
  constructor(private http: HttpClient) { }
  ngOnInit() {

  }

  postUser() {
    this.http.post( 'https://localhost:44384/api/registerusers', this.userCreate).subscribe(responseData => {
    // tslint:disable-next-line: no-debugger
    debugger;
    console.log(responseData);
    this.ngOnInit();
  });
  }

}
