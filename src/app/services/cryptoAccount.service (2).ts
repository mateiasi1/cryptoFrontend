import { MatTableDataSource, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ManagerService } from './manager.service';
import { CryptoAccount, CurrencyListCrypto } from '../components/cryptoCurrency.component';
import { CurrencyList, BankAccount } from '../components/currency.component';



export class CryptoAccountService {
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
            public managerService: ManagerService
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
    this.http.put(`https://localhost:44384/api/CryptoAccount/add`, JSON.stringify
    // tslint:disable-next-line:object-literal-key-quotes
    ({ 'amount': this.amount, 'id': this.id })).subscribe(responseData => {
      // tslint:disable-next-line: no-debugger
      console.log(responseData);
      this.amount = null;
    });
  }
  tradeAmount() {
    console.log(this.selectedValueFrom, this.selectedValueTo, this.amountFrom, this.id);
    this.http.put(`https://localhost:44384/api/conversions/exchangeCrypto`, JSON.stringify
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
