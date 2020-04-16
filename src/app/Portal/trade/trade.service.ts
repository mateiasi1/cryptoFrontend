
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TradeComponent } from './trade.component';
import { BankAccountService } from '../bank/bankAccount/bankAccount.service';
import { MatTableDataSource } from '@angular/material';
import { BankAccount, CurrencyList } from '../bank/bankAccount/currency.component';
import { CurrencyListCrypto } from '../cryptoAccount/cryptoCurrency.component';

@Injectable()
export class TradeService {
constructor(private serverService: BankAccountService,
            private http: HttpClient
            ) {}
public bankAccounts: BankAccount[] = [];
amountFrom = 0;
selectedValueFrom = '';
selectedValueTo = '';
dataSource: MatTableDataSource<BankAccount>;

public  currencyList: CurrencyList[] = [];
public  cryptoList: CurrencyListCrypto[] = [];


trade() {
    this.serverService.trade(this.selectedValueFrom, this.selectedValueTo, this.amountFrom);
  }
 
}
