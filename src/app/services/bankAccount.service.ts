import { HttpClient } from '@angular/common/http';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ManagerService } from './manager.service';
import { BankAccount, CurrencyList } from '../components/currency.component';
import { CurrencyListCrypto } from '../components/cryptoCurrency.component';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { ToasterService } from '../_alert/toaster.service';




export class BankAccountService {
  constructor(private http: HttpClient,
              public dialog: MatDialog,
              public managerService: ManagerService,
              private toaster: ToasterService
  ) {
    this.managerService.getFlatRate();
  }

  environmentURL = environment.apiUrl;
  id: number;
  UserId: number;
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
  public deposit: Subject<boolean> = new Subject<boolean>();

  public bankAccounts: BankAccount[] = [];
  errorMessage = 'ERROR';
  options = {
    autoClose: true,
    keepAfterRouteChange: false
};

  public lastId: number;
  newIndex: number;

  //#region Operations
  setID(idFromHTML: number) {
    this.id = idFromHTML;
  }

  //#endregion
  depositAmount() {
    console.log(this.id);
    // tslint:disable-next-line:object-literal-key-quotes
    // tslint:disable-next-line:max-line-length tslint:disable-next-line:object-literal-key-quotes
    this.http.put(this.environmentURL + `BankAccounts/add`, ({ 'amount': this.amount, 'id': this.id })).subscribe((responseData: any) => {
      if ( responseData.data === null) {
        this.toaster.show('error', responseData.message);
        // TODO: de adaugat in mesajul de eroare responseData.message
        this.amount = null;
        this.deposit.next(true);
      }
      this.toaster.show('success', responseData.message);
      console.log(responseData);
      this.amount = null;
      this.deposit.next(true);
    });
  }

  withdrawAmount() {
    // tslint:disable-next-line:max-line-length
    this.http.put(this.environmentURL + `BankAccounts/withdraw`, ({ 'amount': this.amount, 'id': this.id })).subscribe((responseData: any) => {
      // tslint:disable-next-line: no-debugger
      if ( responseData.data === null) {
        this.toaster.show('error', responseData.message);
        // TODO: de adaugat in mesajul de eroare responseData.message
        this.amount = null;
        this.deposit.next(true);
      } else {
        this.toaster.show('success', responseData.message);
      console.log(responseData);
      this.amount = null;
      this.deposit.next(true);
      }
    });
  }

  tradeAmount() {
    console.log(this.selectedValueFrom, this.selectedValueTo, this.amountFrom, this.id);
    // tslint:disable-next-line:max-line-length
    this.http.put(this.environmentURL + `conversions/exchangeFiat`, JSON.stringify({'selectedValueFrom': this.selectedValueFrom, 'selectedValueTo': this.selectedValueTo, 'amountFrom': this.amountFrom, 'id': this.id })).subscribe((responseData: any) => {
      // tslint:disable-next-line: no-debugger
      console.log(responseData);
      this.deposit.next(true);
    });
    console.log(this.selectedValueFrom, this.selectedValueTo, this.amountFrom, this.id);
  }

  getBankAccounts() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.UserId = currentUser.token.id;
    this.http.get(this.environmentURL + 'BankAccounts/' + this.UserId).subscribe((responseData: any) => {
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
      this.http.get(this.environmentURL + 'Crypto').subscribe((responseData: any) => {

        this.cryptoList = responseData.data.items;
        console.log(responseData.data.items);
        this.sub.next(true);
      });
  }
changeTab(index: number) {
this.newIndex = index;
}
  // #endregion
}
