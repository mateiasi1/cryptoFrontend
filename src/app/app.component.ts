import { Component } from '@angular/core';
import { AuthService } from './auth-service';
import { LoginComponent } from 'src/Login/Login.component';
import { amountState } from './state.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(public authService: AuthService,
    public loginComponent: LoginComponent,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) {}
    openSnackBar(message: string, action: string, className: string) {
      this.snackBar.open(message, action, {
        duration: 5000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: [className]
      });
    }
}
