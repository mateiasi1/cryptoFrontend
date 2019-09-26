import { ServersService } from '../servers/servers.service';
import { Injectable } from '@angular/core';

@Injectable()
export class WithdrawService {
constructor(public serversService: ServersService) {}
amount: number;
id: number;

setID(idFromHTML: number) {
this.id = idFromHTML;
}
putData() {
    this.serversService.withdrawCurrency(this.id, this.amount);
    this.amount = 0;
    this.id = 0;
}
}
