import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

public actualFlat: number;
public actualFee;
constructor(private http: HttpClient) { }


getFee() {
    this.http.get('https://localhost:44384/api/Fees').subscribe(respondeData => {
      this.actualFee = parseFloat(respondeData.toString());
      console.log(this.actualFee);
    });
  }

getFlatRate() {
    this.http.get('https://localhost:44384/api/FlatRateFees').subscribe(respondeData => {
      debugger;
      this.actualFlat = parseFloat(respondeData.toString());
      console.log(this.actualFlat);
    });
  }

}
