import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fee } from './fee.controller';
import { map } from 'rxjs/operators';
import { FlatRate } from './flatRate.component';

@Component({
  selector: 'app-manage-application',
  templateUrl: './manage-application.component.html',
  styleUrls: ['./manage-application.component.css']
})
export class ManageApplicationComponent implements OnInit {
  public newValueFee: number;
  public actualFee;
  public newValueFlat: number;
  public actualFlat;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getFee();
    this.getFlatRate();
  }
  addFee() {
  const newFee: Fee = {Id: 0, Percentage: this.newValueFee, Obsolete: false};
  this.http.post('https://localhost:44384/api/Fees', newFee).subscribe(respondeData => {
      console.log(respondeData);
      this.getFee();
      this.newValueFee = 0;
    });
}

  getFee() {
    this.http.get('https://localhost:44384/api/Fees').subscribe(respondeData => {
      this.actualFee = parseFloat(respondeData.toString());
      console.log(this.actualFee);
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
        this.getFlatRate();
        this.newValueFlat = 0;
      });
  }

    getFlatRate() {
      this.http.get('https://localhost:44384/api/FlatRateFees').subscribe(respondeData => {
        this.actualFlat = parseFloat(respondeData.toString());
        console.log(this.actualFlat);
      });
    }
}
