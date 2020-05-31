

import { Injectable } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { CurrencyList, Currency } from '../components/currency.component';
import { CurrencyListCrypto, CryptoCurrency } from '../components/cryptoCurrency.component';
import { BankAccountService } from './bankAccount.service';
import { AuthService } from './auth-service';

@Injectable({
    providedIn: 'root'
  })
export class AvailableService {
    selectedValue = '';
    selectedValueCrypto = '';
    public  allCurrency: CurrencyList[];
public  allCryptoCurrency: CurrencyListCrypto[] = [];
public cryptoCurrencyFromBackend: CryptoCurrency[] = [];
public currencyFromBackend: Currency[] = [];
dataSource: MatTableDataSource<CurrencyList>;
dataSourceCrypto: MatTableDataSource<CurrencyListCrypto>;

constructor(public serversService: BankAccountService,
            private http: HttpClient,
            public authService: AuthService,
            public dialog: MatDialog) { }
addCurrencyToList(currencyName: string) {
    // this.selectedValue = currencyName;
    const currencyToAdd = this.allCurrency.find(item => item.currencyAbbreviation === currencyName);
    this.http.post('https://localhost:44384/api/Currencies', currencyToAdd).subscribe((responseData: CurrencyList[]) => {
      // this.currencyFromBackend = responseData;
       this.dataSource = new MatTableDataSource(responseData);
       console.log(responseData);
    });
    const itemIndex = this.allCurrency.indexOf(currencyToAdd);
    this.allCurrency.splice(itemIndex, 1);
  }
  addCryptoCurrencyToList() {
    // tslint:disable-next-line:max-line-length
    const cryptoCurrencyToAdd = this.allCryptoCurrency.find(item => item.cryptoCurrencyName === this.selectedValueCrypto);

    this.http.post('https://localhost:44384/api/CryptoCurrencies', cryptoCurrencyToAdd).subscribe((responseData: CurrencyListCrypto[]) => {
     // this.cryptoCurrencyFromBackend = responseData;
       this.dataSourceCrypto = new MatTableDataSource(responseData);
       console.log(responseData);
    });
    const itemIndex = this.allCryptoCurrency.indexOf(cryptoCurrencyToAdd);
    this.allCryptoCurrency.splice(itemIndex, 1);
  }
  getCurrencies() {
    // get fiat currencies for dropdown
    this.http.get('https://localhost:44384/api/GetFiatCurrencyAPI').subscribe((responseData: any) => {
      this.allCurrency = responseData.data.items;
    });
    // get crypto currencies for dropdown
    this.http.get('https://localhost:44384/api/GetCryptoCurrencyAPI').subscribe((responseData: any) => {
      this.allCryptoCurrency = responseData;
    });
    // get saved currencies
    this.http.get('https://localhost:44384/api/Currencies').subscribe((responseData: any) => {
      // this.currencyFromBackend = responseData;
      this.dataSource = new MatTableDataSource(responseData.data.items);
    });
    // get saved crypto
    this.http.get('https://localhost:44384/api/CryptoCurrencies').subscribe((responseData: any) => {
      // this.cryptoCurrencyFromBackend = responseData;
       this.dataSourceCrypto = new MatTableDataSource(responseData.data.items);
    });
  }
}
