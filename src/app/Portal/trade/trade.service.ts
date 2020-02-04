
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TradeComponent } from './trade.component';
import { BankAccountService } from '../bank/bankAccount/bankAccount.service';

@Injectable()
export class TradeService {
constructor(private serverService: BankAccountService,
            private http: HttpClient) {}
amountFrom = 0;
selectedValueFrom = '';
selectedValueTo = '';


trade() {
    this.serverService.trade(this.selectedValueFrom, this.selectedValueTo, this.amountFrom);
  }

}
