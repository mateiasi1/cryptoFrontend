import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fee } from '../portal/manage-application/fee.controller';
import { FlatRate } from '../portal/manage-application/flatRate.component';
import { environment } from 'src/environments/environment';

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

  addFee(role: string) {
    const newFee: Fee = {Id: 0, Percentage: this.newValueFee, UserRole: role, Obsolete: false};
    this.http.post(this.environmentURL + 'Fees', newFee).subscribe(respondeData => {
        console.log(respondeData);
        this.getFee();
        this.newValueFee = 0;
      });
  }

  addFlatRate(role: string) {
    const newFlatRate: FlatRate = {Id: 0, Ammount: this.newValueFlat, Obsolete: false, UserRole: role};
    this.http.post(this.environmentURL + 'FlatRateFees', newFlatRate).subscribe(respondeData => {
        console.log(respondeData);
        this.getFlatRate();
        this.newValueFlat = 0;
      });
  }
}