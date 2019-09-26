import { Component, OnInit } from '@angular/core';
import { ServersService } from '../servers/servers.service';
import { TradeService } from './trade.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {
  public currencies: {id: number, name: string, viewValue: string, currentPrice: number, amount: number}[] = [];
  constructor(public serverService: ServersService,
              private http: HttpClient,
              public tradeService: TradeService) { }

  ngOnInit() {
   this.currencies =  this.serverService.getCurrencies();
   this.http.get('https://localhost:44384/api/Fees').subscribe(respondeData => {
    this.serverService.tradeFee = parseFloat(respondeData.toString());
    console.log(this.serverService.tradeFee);
  });
  }
 
}
