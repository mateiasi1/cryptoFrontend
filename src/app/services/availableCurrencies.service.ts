import { Subject } from 'rxjs';


import { Injectable } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { CurrencyList, Currency } from '../components/currency.component';
import { CurrencyListCrypto, CryptoCurrency } from '../components/cryptoCurrency.component';
import { BankAccountService } from './bankAccount.service';
import { AuthService } from './auth-service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class AvailableService {

  environmentURL = environment.apiUrl;
    selectedValue = '';
    selectedValueCrypto = '';
    public  allCurrency: CurrencyList[];
    public  allCryptoCurrency: CurrencyListCrypto[] = [];
    public cryptoCurrencyFromBackend: CryptoCurrency[] = [];
    public currencyFromBackend: Currency[] = [];

    public sub: Subject<boolean> = new Subject<boolean>();
  

    dataSource: MatTableDataSource<CurrencyList>;
    dataSourceCrypto: MatTableDataSource<CurrencyListCrypto>;

constructor(public serversService: BankAccountService,
            private http: HttpClient,
            public authService: AuthService,
            public dialog: MatDialog) { }
addCurrencyToList(currencyName: string) {
    // this.selectedValue = currencyName;
    const currencyToAdd = this.allCurrency.find(item => item.currencyAbbreviation === this.selectedValue);
    this.http.post(this.environmentURL +  'Currencies', currencyToAdd).subscribe((responseData: CurrencyList[]) => {
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

    this.http.post(this.environmentURL + 'CryptoCurrencies', cryptoCurrencyToAdd).subscribe((responseData: CurrencyListCrypto[]) => {
     // this.cryptoCurrencyFromBackend = responseData;
       this.dataSourceCrypto = new MatTableDataSource(responseData);
       console.log(responseData);
    });
    const itemIndex = this.allCryptoCurrency.indexOf(cryptoCurrencyToAdd);
    this.allCryptoCurrency.splice(itemIndex, 1);
  }
  getCurrencies() {
    // get fiat currencies for dropdown
    this.http.get(this.environmentURL + 'GetFiatCurrencyAPI').subscribe((responseData: any) => {
      this.allCurrency = responseData;
    });
    // get crypto currencies for dropdown
    this.http.get(this.environmentURL + 'GetCryptoCurrencyAPI').subscribe((responseData: any) => {
      this.allCryptoCurrency = responseData;
    });
    // get saved currencies
    this.http.get(this.environmentURL + 'Currencies').subscribe((responseData: any) => {
      // this.currencyFromBackend = responseData;
      this.dataSource = new MatTableDataSource(responseData.data.items);
    });
    // get saved crypto
    this.http.get(this.environmentURL + 'CryptoCurrencies').subscribe((responseData: any) => {
      // this.cryptoCurrencyFromBackend = responseData;
       this.dataSourceCrypto = new MatTableDataSource(responseData.data.items);
       this.sub.next(true);
    });

  }
}
