import { Component, OnInit } from '@angular/core';
import { UserCreate } from 'src/Login/userCreate.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Users } from './users';
import { MatTableDataSource } from '@angular/material';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
public users: Users[] = [];
public userId;
displayedColumns: string[] = ['id', 'name', 'role', 'state', 'actions'];
dataSource: MatTableDataSource<Users>;
unconfirmedUsers: MatTableDataSource<Users>;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getConfirmedUsers();
    this.getUsersUnconfirmed();
    debugger;
  }


  getConfirmedUsers() {
    this.http.get('https://localhost:44384/api/users').subscribe((respondeData: Users[]) => {
      this.users = respondeData;
      this.dataSource = new MatTableDataSource(this.users);
      debugger;
      console.log(this.users);
    });
  }

  getUsersUnconfirmed() {
    this.http.get('https://localhost:44384/api/users/1').subscribe((respondeData: Users[]) => {
      this.users = respondeData;
      this.unconfirmedUsers = new MatTableDataSource(this.users);
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

  suspendUser(id: number) {
    debugger;
    this.http.put('https://localhost:44384/api/Users/suspend', id).subscribe(respondeData => {
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
