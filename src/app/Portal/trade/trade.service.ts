
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
  getBankAccounts() {

    this.http.get('https://localhost:44384/api/BankAccounts').subscribe((responseData: BankAccount[]) => {
       this.bankAccounts = responseData;
       this.dataSource = new MatTableDataSource(responseData);
       console.log(responseData);
     });
   }
   // #region Currency
  getCurrencies() {
    this.http.get('https://localhost:44384/api/Currencies').subscribe((responseData: CurrencyList[]) => {
      this.currencyList = responseData;
      console.log(responseData);
    });
  }

  getCryptoCurrencies() {
    this.http.get('https://localhost:44384/api/CryptoCurrencies').subscribe((responseData: CurrencyListCrypto[]) => {
      this.cryptoList = responseData;
      console.log(responseData);
    });
  }
  // #endregion
}
