import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { LoginComponent } from '../login/LoginComponent';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AlertService } from '../_alert';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {

  constructor(public authService: AuthService,
              public loginComponent: LoginComponent,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              public alertService: AlertService) { }
  options = {
    autoClose: true,
    keepAfterRouteChange: false
};

  ngOnInit() {
  }
}
