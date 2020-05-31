import { ManagerService } from '../../manage-application/manager.service';

import { BankAccount, CurrencyList } from './currency.component';
import { CurrencyListCrypto } from '../../cryptoAccount/cryptoCurrency.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatTableDataSource } from '@angular/material';




export class BankAccountService {
  id: number;
  tradeFee = 0; // vine din backend
  exchangeRate = 2; // vine din callul catre API cu parametrii selectedValueFrom si selectedValueTo
  amount: number;
  amountFrom = 0;
  selectedValueFrom = '';
  selectedValueTo = '';
  dataSource: MatTableDataSource<BankAccount>;

  public currencyList: CurrencyList[] = [];
  public cryptoList: CurrencyListCrypto[] = [];



  public bankAccounts: BankAccount[] = [];
  errorMessage = 'ERROR';
  constructor(private http: HttpClient,
    public dialog: MatDialog,
    public managerService: ManagerService
  ) {
    this.managerService.getFlatRate();
  }

  public lastId: number;

  //#region Operations
  setID(idFromHTML: number) {
    this.id = idFromHTML;
  }

  //#endregion
  depositAmount() {
    console.log(this.id);
    // tslint:disable-next-line:max-line-length
    this.http.put(`https://localhost:44384/api/BankAccounts/add`, JSON.stringify({ 'amount': this.amount, 'id': this.id })).subscribe(responseData => {
      // tslint:disable-next-line: no-debugger
      console.log(responseData);
      this.amount = null;
    });
  }

  withdrawAmount() {
    // tslint:disable-next-line:max-line-length
    return this.http.put(`https://localhost:44384/api/BankAccounts/withdraw`, JSON.stringify({ 'amount': this.amount, 'id': this.id }));
  }

  tradeAmount() {
    console.log(this.selectedValueFrom, this.selectedValueTo, this.amountFrom, this.id);
    // tslint:disable-next-line:max-line-length
    this.http.put(`https://localhost:44384/api/conversions/exchangeFiat`, JSON.stringify({'selectedValueFrom': this.selectedValueFrom, 'selectedValueTo': this.selectedValueTo, 'amountFrom': this.amountFrom, 'id': this.id })).subscribe(responseData => {
      // tslint:disable-next-line: no-debugger
      console.log(responseData);
    });
    console.log(this.selectedValueFrom, this.selectedValueTo, this.amountFrom, this.id);
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
