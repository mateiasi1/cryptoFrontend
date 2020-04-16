import { Component, OnInit } from '@angular/core';
import { TradeService } from './trade.service';
import { HttpClient } from '@angular/common/http';
import { BankAccountService } from '../bank/bankAccount/bankAccount.service';
import { AvailableService } from '../availableCurrencies/availableCurrencies.service';


@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {
  public currencies: {id: number, name: string, currencyAbbreviation: string, currency: number, sold: number}[] = [];
  constructor(public serverService: BankAccountService,
              private http: HttpClient,
              public tradeService: TradeService,
              public availableCurrencies: AvailableService
              ) { }

  ngOnInit() {
  //  this.currencies =  this.serverService.getCurrencies();
   this.http.get('https://localhost:44384/api/Fees').subscribe(respondeData => {
    this.serverService.tradeFee = parseFloat(respondeData.toString());
    console.log(this.serverService.tradeFee);
  });
  }
 
}
