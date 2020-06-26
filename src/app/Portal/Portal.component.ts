import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { LoginComponent } from '../login/LoginComponent';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {

  constructor(public authService: AuthService,
              public loginComponent: LoginComponent,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) { }
  options = {
    autoClose: true,
    keepAfterRouteChange: false
};

  ngOnInit() {
  }
}
