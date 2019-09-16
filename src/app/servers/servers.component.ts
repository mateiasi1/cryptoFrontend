import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { HomeService } from '../deposit/deposit.service';
import { WithdrawService } from '../users/withdraw.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  public servers: {id: number, name: string, status: string}[] = [];
 public currencyFromBackend: {id: number, name: string, viewValue: string, currentPrice: number, amount: number}[] = [];
 id = 0;
  constructor(public serversService: ServersService,
              public homeService: HomeService,
              public withdrawService: WithdrawService
    ) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
    this.currencyFromBackend = this.serversService.getCurrencies();
  }

}
