import { HttpClientWServiceService } from './HttpClientWService.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ManagerService } from './manager.service';
import { CryptoAccount, CurrencyListCrypto } from '../components/cryptoCurrency.component';
import { CurrencyList, BankAccount } from '../components/currency.component';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';



export class CryptoAccountService {

  environmentURL = environment.apiUrl;
  id: number;
  tradeFee = 0; // vine din backend
  exchangeRate = 2; // vine din callul catre API cu parametrii selectedValueFrom si selectedValueTo
  amount: number;
  amountFrom = 0;
  selectedValueFrom = '';
  selectedValueTo = '';
  dataSource: MatTableDataSource<CryptoAccount>;

  public currencyList: CurrencyList[] = [];
  public cryptoList: CurrencyListCrypto[] = [];

  public bankAccounts: BankAccount[] = [];
  errorMessage = 'ERROR';
  public cryptoAccounts: CryptoAccount[] = [];

constructor(private http: HttpClient,
            public dialog: MatDialog,
            public managerService: ManagerService,
            private httpClientWService: HttpClientWServiceService
  ) {
    this.managerService.getFee();
  }

  public lastId: number;

//#region Operations
  setID(idFromHTML: number) {
  this.id = idFromHTML;
  }

  depositAmount() {
    console.log(this.id);
    this.http.put(this.environmentURL +  `CryptoAccount/add`, JSON.stringify
    // tslint:disable-next-line:object-literal-key-quotes
    ({ 'amount': this.amount, 'id': this.id })).subscribe(responseData => {
      // tslint:disable-next-line: no-debugger
      console.log(responseData);
      this.amount = null;
    });
  }
  tradeAmount() {
    console.log(this.selectedValueFrom, this.selectedValueTo, this.amountFrom, this.id);
    this.http.put(this.environmentURL + `conversions/exchangeCrypto`, JSON.stringify
    // tslint:disable-next-line:object-literal-key-quotes
    ({'selectedValueFrom': this.selectedValueFrom, 'selectedValueTo': this.selectedValueTo,
     // tslint:disable-next-line:object-literal-key-quotes
     'amountFrom': this.amountFrom, 'id': this.id })).subscribe(responseData => {
      // tslint:disable-next-line: no-debugger
      console.log(responseData);
    });
    console.log(this.selectedValueFrom, this.selectedValueTo, this.amountFrom, this.id);
  }

//#endregion

 // #region Currency
getCurrencies() {
  this.httpClientWService.get(this.environmentURL + 'Currencies').subscribe((response: CurrencyList[]) => {
    this.currencyList = response;
    console.log('resp', response);
  });
}

getCryptoCurrencies() {
  this.httpClientWService.get(this.environmentURL + 'CryptoCurrencies').subscribe((response: any) => {
    this.cryptoList = response.data.items;
    console.log('resp', response);
  });
}
// #endregion
}
