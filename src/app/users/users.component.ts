import { Component, OnInit } from '@angular/core';
import { UserCreate } from 'src/Login/userCreate.component';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
public users;
public userId;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getUsers();
  }


  getUsers() {
    this.http.get('https://localhost:44384/api/Users').subscribe(respondeData => {
      this.users = respondeData;
      debugger;
      console.log(this.users);
    });
  }
//change password
  putUser(id: number) {
    debugger;
    this.http.put('https://localhost:44384/api/Users', id).subscribe(respondeData => {
      debugger;
      console.log(this.users);
    });
  }
//confirm user
confirmUser(id: number, state: boolean) {
  debugger;
  this.http.put(`https://localhost:44384/api/Users/${state}`, id).subscribe(respondeData => {
    debugger;
    const params = new HttpParams()
  .set('Id', id.toString());
    console.log(this.users);
  });
}
  deleteUser(id: number) {
    debugger;
    const params = new HttpParams()
  .set('Id', id.toString());
    this.http.delete(`https://localhost:44384/api/Users/${id}`).subscribe(respondeData => {
      debugger;
      console.log(this.users);
    });
  }
}
