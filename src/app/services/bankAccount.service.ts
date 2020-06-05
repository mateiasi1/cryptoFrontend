import { HttpClient } from '@angular/common/http';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ManagerService } from './manager.service';
import { BankAccount, CurrencyList } from '../components/currency.component';
import { CurrencyListCrypto } from '../components/cryptoCurrency.component';
import { AlertService } from '../_alert';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';




export class BankAccountService {

  environmentURL = environment.apiUrl;
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

  public sub: Subject<boolean> = new Subject<boolean>();


  public bankAccounts: BankAccount[] = [];
  errorMessage = 'ERROR';
  constructor(private http: HttpClient,
              public dialog: MatDialog,
              public managerService: ManagerService,
              protected alertService: AlertService
  ) {
    this.managerService.getFlatRate();
  }
  options = {
    autoClose: true,
    keepAfterRouteChange: false
};

  public lastId: number;

  //#region Operations
  setID(idFromHTML: number) {
    this.id = idFromHTML;
  }

  //#endregion
  depositAmount() {
    console.log(this.id);
    // tslint:disable-next-line:object-literal-key-quotes
    // tslint:disable-next-line:max-line-length tslint:disable-next-line:object-literal-key-quotes
    this.http.put(this.environmentURL + `BankAccounts/add`, JSON.stringify({ 'amount': this.amount, 'id': this.id })).subscribe((responseData: any) => {
      if ( responseData.data === null) {
        this.alertService.error(responseData.message, this.options);
        // TODO: de adaugat in mesajul de eroare responseData.message
        this.amount = null;
      }
      this.alertService.success(responseData.message, this.options);
      console.log(responseData);
      this.amount = null;
    });
  }

  withdrawAmount() {
    // tslint:disable-next-line:max-line-length
    this.http.put(this.environmentURL + `BankAccounts/withdraw`, JSON.stringify({ 'amount': this.amount, 'id': this.id })).subscribe((responseData: any) => {
      // tslint:disable-next-line: no-debugger
      if ( responseData.data === null) {
        this.alertService.error(responseData.message, this.options);
        // TODO: de adaugat in mesajul de eroare responseData.message
        this.amount = null;
      } else {
      this.alertService.success(responseData.message, this.options);
      console.log(responseData);
      this.amount = null;
      }
    });
  }

  tradeAmount() {
    console.log(this.selectedValueFrom, this.selectedValueTo, this.amountFrom, this.id);
    // tslint:disable-next-line:max-line-length
    this.http.put(this.environmentURL + `conversions/exchangeFiat`, JSON.stringify({'selectedValueFrom': this.selectedValueFrom, 'selectedValueTo': this.selectedValueTo, 'amountFrom': this.amountFrom, 'id': this.id })).subscribe((responseData: any) => {
      // tslint:disable-next-line: no-debugger
      console.log(responseData);
    });
    console.log(this.selectedValueFrom, this.selectedValueTo, this.amountFrom, this.id);
  }

  getBankAccounts() {

    this.http.get(this.environmentURL + 'BankAccounts').subscribe((responseData: any) => {
       this.bankAccounts = responseData.data.items;
       this.dataSource = new MatTableDataSource(responseData.data.items);
       console.log('BANK ACCOUNTS', responseData.data.items);
       this.sub.next(true);
     });
   }
   // #region Currency
  getCurrencies() {
    this.http.get(this.environmentURL + 'Currencies').subscribe((responseData: any) => {
      this.currencyList = responseData.data.items;
      console.log('Currencies', responseData.data.items);
    });
  }

  getCryptoCurrencies() {
    this.http.get(this.environmentURL + 'CryptoCurrencies').subscribe((responseData: any) => {
      this.cryptoList = responseData.data.items;
      console.log('Crypto currencies', responseData.data.items);
    });
  }
  // #endregion
}