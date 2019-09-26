import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { HomeService } from '../deposit/deposit.service';
import { WithdrawService } from '../withdraw/withdraw.service';


@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
 public currencyFromBackend: {id: number, name: string, viewValue: string, currentPrice: number, amount: number}[] = [];
 name: string;
 viewValue: string;
 amount: number;
 currentPrice: number;
  constructor(public serversService: ServersService,
              public homeService: HomeService,
              public withdrawService: WithdrawService
    ) { }

  ngOnInit() {

    this.currencyFromBackend = this.serversService.getCurrencies();
  }
  addCurrency() {
    this.serversService.addCurrency(this.name, this.viewValue, this.currentPrice, this.amount);
  }
  deleteCurrency(id: number) {
    this.serversService.deleteCurrency(id);
  }

}
