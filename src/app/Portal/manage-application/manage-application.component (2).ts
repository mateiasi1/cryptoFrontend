import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ManagerService } from 'src/app/services/manager.service';

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
    this.ngOnInit();
}
  addFlatRate() {
    this.managerService.addFlatRate(this.role);
    this.ngOnInit();
  }
}
