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
  public newValueFee: number;
  public newValueFlat: number;
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
  const newFee: Fee = {Id: 0, Percentage: this.newValueFee, UserRole: this.role, Obsolete: false};
  this.http.post('https://localhost:44384/api/Fees', newFee).subscribe(respondeData => {
      console.log(respondeData);
      this.managerService.getFee();
      this.newValueFee = 0;
    });
}

 

  // getFeeTest() {
  //   this.http.get('https://localhost:44384/api/Fees').pipe(map((responseData: string) => {
  //     this.actualFlat = responseData;
  //     return this.actualFee;
  //   })).subscribe(respondeData => {
  //     console.log(this.actualFee);
  //   });
  // }


  addFlatRate() {
    const newFlatRate: FlatRate = {Id: 0, Ammount: this.newValueFlat, Obsolete: false};
    this.http.post('https://localhost:44384/api/FlatRateFees', newFlatRate).subscribe(respondeData => {
        console.log(respondeData);
        this.managerService.getFlatRate();
        this.newValueFlat = 0;
      });
  }
}