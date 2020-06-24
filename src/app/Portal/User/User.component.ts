import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AlertService } from 'src/app/_alert';

@Component({
  selector: 'app-User',
  templateUrl: './User.component.html',
  styleUrls: ['./User.component.css']
})
export class UserComponent implements OnInit {

  constructor(public authService: AuthService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              public alertService: AlertService) { }

  ngOnInit() {
  }

}
