import { Component, OnInit } from '@angular/core';
import { ServersService } from '../servers/servers.service';
import { TradeService } from './trade.service';


@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {

  public currencies: {id: number, name: string, viewValue: string, currentPrice: number, amount: number}[] = [];
  constructor(public serverService: ServersService,
              public tradeService: TradeService) { }

  ngOnInit() {
   this.currencies =  this.serverService.getCurrencies();

  }

}
