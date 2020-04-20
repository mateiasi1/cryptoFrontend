import { Injectable } from '@angular/core';
import { CurrencyList, Currency } from '../bank/bankAccount/currency.component';
import { BankAccountService } from '../bank/bankAccount/bankAccount.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth-service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { CryptoCurrency, CurrencyListCrypto } from '../cryptoAccount/cryptoCurrency.component';

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

addCurrencyToList() {
    const currencyToAdd = this.allCurrency.find(item => item.currencyAbbreviation === this.selectedValue);
    debugger;
    this.http.post('https://localhost:44384/api/Currencies', currencyToAdd).subscribe((responseData: CurrencyList[]) => {
      // this.currencyFromBackend = responseData;
       this.dataSource = new MatTableDataSource(responseData);
      console.log(responseData);
    });
    debugger;
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
    this.http.get('https://localhost:44384/api/GetFiatCurrencyAPI').subscribe((responseData: CurrencyList[]) => {
      this.allCurrency = responseData;
      console.log(this.allCurrency);
    });
    // get crypto currencies for dropdown
    this.http.get('https://localhost:44384/api/GetCryptoCurrencyAPI').subscribe((responseData: CurrencyListCrypto[]) => {
      this.allCryptoCurrency = responseData;
      console.log(this.allCryptoCurrency);
    });
    // get saved currencies
    this.http.get('https://localhost:44384/api/Currencies').subscribe((responseData: CurrencyList[]) => {
      // this.currencyFromBackend = responseData;
       this.dataSource = new MatTableDataSource(responseData);
      console.log(responseData);
    });
    // get saved crypto
    this.http.get('https://localhost:44384/api/CryptoCurrencies').subscribe((responseData: CurrencyListCrypto[]) => {
      // this.cryptoCurrencyFromBackend = responseData;
       this.dataSourceCrypto = new MatTableDataSource(responseData);
      console.log(responseData);
    });
  }
}
