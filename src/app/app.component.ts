import { Component } from '@angular/core';
import { AuthService } from './auth-service';
import { LoginComponent } from 'src/Login/Login.component';
import { amountState } from './state.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public authService: AuthService,
    public loginComponent: LoginComponent) {}
}
