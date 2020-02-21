import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fee } from './fee.controller';
import { map } from 'rxjs/operators';
import { FlatRate } from './flatRate.component';
import { ManagerService } from './manager.service';

@Component({
  selector: 'app-manage-application',
  templateUrl: './manage-application.component.html',
  styleUrls: ['./manage-application.component.css']
})
export class ManageApplicationComponent implements OnInit {
  public role: string;
  
  constructor(private http: HttpClient,
              public managerService: ManagerService) { }

  ngOnInit() {
    this.managerService.getFee();
    this.managerService.getFlatRate();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.role = currentUser.token.role;
  }
  addFee() {
    this.managerService.addFee(this.role);
}
  addFlatRate() {
    this.managerService.addFlatRate(this.role);
  }
}