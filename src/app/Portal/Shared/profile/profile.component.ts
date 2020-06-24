import { AuthService } from 'src/app/services/auth-service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UsersProfile, ChangePassword } from 'src/app/components/users';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  environmentURL = environment.apiUrl;
  public userId;
  public users: UsersProfile[] = [];
  public password: ChangePassword[] = [];

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.getUserData(this.userId);
    this.password.push(new ChangePassword());
  }

  getUserData(id: number) {
    const params = new HttpParams()
    .set('Id', id.toString());
      this.http.get(this.environmentURL + `Users/`+ this.userId).subscribe((respondeData: any) => {
      this.users = respondeData.data.items;
      console.log(respondeData.data.items);
    });
  }

  changeUser() {
    this.http.post( this.environmentURL + 'users/change', this.users[0]).subscribe(responseData => {
      // tslint:disable-next-line: no-debugger
      debugger;
      console.log(responseData);
    });
  }

  changePassword() {
    this.password[0].UserId = this.userId;
    this.http.post( this.environmentURL + 'users/changePassword', this.password[0]).subscribe(responseData => {
      // tslint:disable-next-line: no-debugger
      debugger;
      console.log(responseData);
    });
  }
}
