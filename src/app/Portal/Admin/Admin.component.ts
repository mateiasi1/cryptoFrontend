import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-Admin',
  templateUrl: './Admin.component.html',
  styleUrls: ['./Admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public authService: AuthService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

}
