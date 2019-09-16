import { ServersService } from '../servers/servers.service';
import { Injectable } from '@angular/core';

@Injectable()
export class TradeService {
constructor(private serverService: ServersService) {}
amountFrom = 0;
selectedValueFrom = '';
selectedValueTo = '';

trade() {
    this.serverService.trade(this.selectedValueFrom, this.selectedValueTo, this.amountFrom);
  }

}
