import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FlatRate } from '../Portal/Admin/manage-application/flatRate.component';
import { Fee } from '../Portal/Admin/manage-application/fee.controller';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

environmentURL = environment.apiUrl;
public actualFlat;
public actualFee;
public newValueFee = 0;
public newValueFlat = 0;
constructor(private http: HttpClient) { }


getFee() {
    this.http.get(this.environmentURL + 'Fees').subscribe(respondeData => {
      this.actualFee = respondeData;
      console.log(this.actualFee);
    });
  }

getFlatRate() {
    this.http.get(this.environmentURL + 'FlatRateFees').subscribe(respondeData => {
      this.actualFlat = respondeData;
      console.log(this.actualFlat);
    });
  }

  addFee(role: string, percentage: number) {
    const newFee: Fee = {Id: 0, Percentage: percentage, UserRole: role, Obsolete: false};
    this.http.post(this.environmentURL + 'Fees', newFee).subscribe(respondeData => {
        console.log(respondeData);
        this.getFee();
        this.newValueFee = 0;
      });
  }

  addFlatRate(role: string, amount: number) {
    const newFlatRate: FlatRate = {Id: 0, Ammount: amount, Obsolete: false, UserRole: role};
    this.http.post(this.environmentURL + 'FlatRateFees', newFlatRate).subscribe(respondeData => {
        console.log(respondeData);
        this.getFlatRate();
        this.newValueFlat = 0;
      });
  }
}
