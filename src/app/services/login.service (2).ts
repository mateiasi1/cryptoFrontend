import { AuthService } from './auth-service';
import { UserLogin } from '../components/userLogin.component';
import { HttpClient } from '@angular/common/http';

export class LoginService {

    username = '';
    debugger;
    password = '';
    token: string;
    public userLogin: UserLogin = {Username: this.username, Password: this.password, Token: this.token, Role: this.token};

    constructor(private http: HttpClient,
                public authService: AuthService
        ) { }

    logoutUser() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const token = currentUser.token.token;
        this.userLogin.Token = token;
        const userId = currentUser.token.id;
        return this.http.delete('https://localhost:44384/api/Logins/' + userId).subscribe(responseData => {
          this.authService.isLoggedIn = false;
          localStorage.clear();
        });
    }
}