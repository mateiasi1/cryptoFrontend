import { AuthService } from 'src/app/auth-service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { CryptoCurrency } from '../cryptoAccount/cryptoCurrency.component';
import { Currency, CurrencyList, CryptoCurrencyList } from '../bank/bankAccount/currency.component';
import { BankAccountService } from '../bank/bankAccount/bankAccount.service';

@Component({
  selector: 'app-availablecurrencies',
  templateUrl: './availableCurrencies.component.html',
  styleUrls: ['./availableCurrencies.component.css']
})
export class AvailableCurrenciesComponent implements OnInit {

  selectedValue = '';
  selectedValueCrypto = '';
  displayedColumns: string[] = ['id', 'name', 'viewValue', 'actions'];
  displayedColumnsCrypto: string[] = ['id', 'name', 'actions'];
  role: string;
  isCurrentUserAdmin: boolean;

  dataSource: MatTableDataSource<Currency>;
  dataSourceCrypto: MatTableDataSource<CryptoCurrency>;

  currency: Currency;
  crypto: Crypto;
  public currencyFromBackend: Currency[] = [];
  public cryptoCurrencyFromBackend: CryptoCurrency[] = [];

public  allCurrency: CurrencyList[] = [];
public  allCryptoCurrency: CryptoCurrencyList[] = [];

  constructor(public serversService: BankAccountService,
              private http: HttpClient,
              public authService: AuthService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.currencyFromBackend);
    this.getCurrencies();
  }

  // addCurrency(name: string, viewValue: string, id: number, currentPrice: number) {
  //   this.serversService.addCurrency(id, name, viewValue, currentPrice);
  //   debugger;
  //   const currencyToDelete = this.currencyFromBackend.find(item => item.id === id);
  //   const itemIndex = this.currencyFromBackend.indexOf(currencyToDelete);
  //   debugger;
  //   this.currencyFromBackend.splice(itemIndex, 1);
  // }

  addCurrencyToList() {
    const currencyToAdd = this.allCurrency.find(item => item.currencyAbbreviation === this.selectedValue);
    debugger;

    this.http.post('https://localhost:44384/api/Currencies', currencyToAdd).subscribe((responseData: Currency[]) => {
      this.currencyFromBackend = responseData;
       this.dataSource = new MatTableDataSource(responseData);
      console.log(responseData);
    });
    const itemIndex = this.allCurrency.indexOf(currencyToAdd);
    this.allCurrency.splice(itemIndex, 1);
  }

  addCryptoCurrencyToList() {
    const cryptoCurrencyToAdd = this.allCryptoCurrency.find(item => item.cryptoCurrencyName === this.selectedValueCrypto);
    debugger;

    this.http.post('https://localhost:44384/api/CryptoCurrencies', cryptoCurrencyToAdd).subscribe((responseData: CryptoCurrency[]) => {
      this.cryptoCurrencyFromBackend = responseData;
       this.dataSourceCrypto = new MatTableDataSource(responseData);
      console.log(responseData);
    });
    const itemIndex = this.allCryptoCurrency.indexOf(cryptoCurrencyToAdd);
    this.allCryptoCurrency.splice(itemIndex, 1);
  }

  getCurrencies() {
    //get fiat currencies for dropdown
    this.http.get('https://localhost:44384/api/GetFiatCurrencyAPI').subscribe((responseData: CurrencyList[]) => {
      this.allCurrency = responseData;
      debugger;
      console.log(this.allCurrency);
    });
    //get crypto currencies for dropdown
    this.http.get('https://localhost:44384/api/GetCryptoCurrencyAPI').subscribe((responseData: CryptoCurrencyList[]) => {
      this.allCryptoCurrency = responseData;
      console.log(this.allCryptoCurrency);
    });
    // get saved currencies
    this.http.get('https://localhost:44384/api/Currencies').subscribe((responseData: Currency[]) => {
      this.currencyFromBackend = responseData;
       this.dataSource = new MatTableDataSource(responseData);
      console.log(responseData);
    });
    // get saved crypto
    this.http.get('https://localhost:44384/api/CryptoCurrencies').subscribe((responseData: CryptoCurrency[]) => {
      this.cryptoCurrencyFromBackend = responseData;
       this.dataSourceCrypto = new MatTableDataSource(responseData);
      console.log(responseData);
    });
  }
}
