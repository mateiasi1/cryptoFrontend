import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Users } from 'src/app/components/users';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users: Users[] = [];
  public userId;
  displayedColumns: string[] = ['name', 'role', 'state', 'actions'];
  dataSource: MatTableDataSource<Users>;
  unconfirmedUsers: MatTableDataSource<Users>;
    constructor(private http: HttpClient) { }

    ngOnInit() {
      this.getConfirmedUsers();
      this.getUsersUnconfirmed();
    }

    getConfirmedUsers() {
      this.http.get('https://localhost:44384/api/users/confirmed').subscribe((respondeData: Users[]) => {
        this.users = respondeData;
        this.dataSource = new MatTableDataSource(this.users);
        console.log(this.users);
      });
    }

    getUsersUnconfirmed() {
      this.http.get('https://localhost:44384/api/users/unconfirmed').subscribe((respondeData: Users[]) => {
        this.users = respondeData;
        this.unconfirmedUsers = new MatTableDataSource(this.users);
        console.log(this.users);
      });
    }

    resetUser(id: number) {
      this.http.put('https://localhost:44384/api/Users', id).subscribe(respondeData => {
        console.log(this.users);
      });
      this.ngOnInit();
    }

    suspendUser(id: number) {
      this.http.put('https://localhost:44384/api/Users/suspend', id).subscribe(respondeData => {
        console.log(this.users);
      });
      this.ngOnInit();
    }

  confirmUser(id: number, state: boolean) {
    this.http.put(`https://localhost:44384/api/Users/${state}`, id).subscribe(respondeData => {
      const params = new HttpParams()
    .set('Id', id.toString());
      console.log(this.users);
    });
    this.ngOnInit();
  }
    deleteUser(id: number) {
      const params = new HttpParams()
    .set('Id', id.toString());
      this.http.delete(`https://localhost:44384/api/Users/${id}`).subscribe(respondeData => {
        console.log(this.users);
      });
      this.ngOnInit();
    }

    forgotPassword(id: number) {
      this.http.post( 'https://localhost:44384/api/users/forgot', id).subscribe(responseData => {
      // tslint:disable-next-line: no-debugger
      debugger;
      console.log(responseData);
    });
      this.ngOnInit();
    }
}
