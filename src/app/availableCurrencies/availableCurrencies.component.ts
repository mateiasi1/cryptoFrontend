import { Component, OnInit } from '@angular/core';
import { CryptoCurrencyList, CurrencyList, Currency } from '../bankAccount/currency.component';
import { BankAccountService } from '../bankAccount/bankAccount.service';
import { MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-availableCurrencies',
  templateUrl: './availableCurrencies.component.html',
  styleUrls: ['./availableCurrencies.component.css']
})
export class AvailableCurrenciesComponent implements OnInit {

  selectedValue = '';
  selectedValueCrypto = '';
  displayedColumns: string[] = ['id', 'name', 'viewValue', 'actions'];
  displayedColumnsCrypto: string[] = ['id', 'name', 'actions'];

  dataSource: MatTableDataSource<Currency>;
  dataSourceCrypto: MatTableDataSource<Crypto>;

  currency: Currency;
  crypto: Crypto;
  public currencyFromBackend: Currency[] = [];
  public cryptoCurrencyFromBackend: Crypto[] = [];

public  allCurrency: CurrencyList[] = [];
public  allCryptoCurrency: CryptoCurrencyList[] = [];

  constructor(public serversService: BankAccountService,
              private http: HttpClient) { }

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

  getCurrencies() {
    this.http.get('https://localhost:44384/api/GetFiatCurrencyAPI').subscribe((responseData: CurrencyList[]) => {
      this.allCurrency = responseData;
      debugger;
      console.log(this.allCurrency);
    });
    this.http.get('https://localhost:44384/api/GetCryptoCurrencyAPI').subscribe((responseData: CryptoCurrencyList[]) => {
      this.allCryptoCurrency = responseData;
      console.log(this.allCryptoCurrency);
    });

    this.http.get('https://localhost:44384/api/Currencies').subscribe((responseData: Currency[]) => {
      this.currencyFromBackend = responseData;
       this.dataSource = new MatTableDataSource(responseData);
      console.log(responseData);
    });
    
  }
}
