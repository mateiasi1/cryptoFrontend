import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';
import { AuthService } from 'src/app/services/auth-service';
import { Bank, BankAccount } from 'src/app/components/bank.component';
import { CurrencyList } from 'src/app/components/currency.component';
import { CurrencyListCrypto } from 'src/app/components/cryptoCurrency.component';
import { CryptoAccount, Crypto } from 'src/app/components/crypto.component';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  constructor(private http: HttpClient,
              public authService: AuthService,
              private formBuilder: FormBuilder) {
                this.sub.subscribe(e => {
                  this.dataSource.paginator = this.paginator;
                  this.dataSourceCrypto.paginator = this.paginator2;
                });
                
                this.createAddBankForm();
                this.createAddCryptoForm();
               }

  public sub: Subject<boolean> = new Subject<boolean>();
  addBankForm: FormGroup;
  addCryptoForm: FormGroup;

  environmentURL = environment.apiUrl;
  displayedColumns: string[] = ['BankName', 'IBAN', 'Currency', 'Actions'];
  displayedColumnsCrypto: string[] = ['CryptoName', 'Actions'];

  @ViewChild('paginator', {static: true}) paginator: MatPaginator;
  @ViewChild('paginator2', {static: false}) paginator2: MatPaginator;

  dataSource: MatTableDataSource<Bank>;
  dataSourceCrypto: MatTableDataSource<Crypto>;

  public bankAccounts: Bank[] = [];
  public cryptoAccounts: Crypto[] = [];

  UserId = 0;
  BankName: string;
  IBAN: string;
  CurrencyAbbreviation: string;

 role: string;
 isCurrentUserAdmin: boolean;

  CryptoName: string;
  Refference: string;
  token: string;
  panelOpenState = false;
  public  currencyList: CurrencyList[] = [];
  public  cryptoList: CurrencyListCrypto[] = [];
 httpOptions = {
      headers: new HttpHeaders({
        // tslint:disable-next-line:object-literal-key-quotes
        'Authorization': 'Bearer ' + this.token
      })
    };

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.bankAccounts);
    this.dataSourceCrypto = new MatTableDataSource(this.cryptoAccounts);
    this.getCurrencies();
    this.getCryptoCurrencies();
    this.getBanks();
    this.getCrypto();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser.token.token;
    this.UserId = currentUser.token.id;
    this.dataSource.paginator = this.paginator;
  }
  // #region Bank
  getBanks() {
    this.http.get(this.environmentURL + 'Banks/' + this.UserId).subscribe((responseData: any) => {
      this.bankAccounts = responseData.data.items;
      this.dataSource = new MatTableDataSource(responseData.data.items);
      console.log(responseData.data.items);
      this.sub.next(true);
    });
  }

  addBank(bankName: string, iban: string, currency: string) {
    // tslint:disable-next-line:max-line-length
    const bankToAdd: Bank = {id: 0, bankName: bankName, iban: iban, currencyName: '', currencyAbbreviation: currency };

    this.http.post(this.environmentURL + 'Banks', bankToAdd).subscribe((responseData: any) => {
      // de adaugat aici si de retrivuit din backend in lista ca in available
      this.bankAccounts = responseData.data.items;
       // tslint:disable-next-line:align
       this.dataSource = new MatTableDataSource(responseData.data.items);
      console.log(responseData.data.items);
    });
    this.ngOnInit();
  }

  deleteBank(id: number) {
    this.http.delete(this.environmentURL + 'Banks/' + id).subscribe((responseData: any) => {
      this.bankAccounts = responseData.data.items;
      this.dataSource = new MatTableDataSource(responseData.data.items);
      console.log(responseData.data.items);
  });
    this.ngOnInit();
  }
  // #endregion

  // #region Currency
  getCurrencies() {
    this.http.get(this.environmentURL + 'Currencies').subscribe((responseData: any) => {
      this.currencyList = responseData.data.items;
      console.log(responseData.data.items);
    });
  }

  getCryptoCurrencies() {
    this.http.get(this.environmentURL + 'CryptoCurrencies').subscribe((responseData: any) => {
      this.cryptoList = responseData.data.items;
      console.log(responseData.data.items);
    });
  }
  // #endregion

  // #region Bank to Bank Account
  addBankAccount(id: number, currencyName: string, bankName: string, iban: string) {
    // tslint:disable-next-line: max-line-length
    const accountToAdd: BankAccount = {id: 0, idUser: this.UserId, idCurrency: 0, currencyName: currencyName, idBank: id, bankName: bankName, iban: iban, sold: 0};

    this.http.post(this.environmentURL + 'BankAccounts', accountToAdd).subscribe((responseData: any) => {

      console.log(responseData.data.items);
    });
    this.ngOnInit();
  }
  // #endregion

 // #region Crypto to Crypto Account
    addCryptoAccount(id: number, cryptoCurrencyName: string, cryptoName: string, refference: string) {
    // tslint:disable-next-line: max-line-length
    const cryptoAccountToAdd: CryptoAccount = {id: 0, idUser: this.UserId, idCryptoCurrency: 0, cryptoCurrencyName: cryptoCurrencyName, idCrypto: id, cryptoName: cryptoName, refference: ' ', sold: 0};

    this.http.post(this.environmentURL + 'CryptoAccount', cryptoAccountToAdd).subscribe((responseData: any) => {

      console.log(responseData.data.items);
    });
    this.ngOnInit();
    }
  // #endregion

  // #region Crypto
  getCrypto() {
    this.http.get(this.environmentURL + 'Crypto').subscribe((responseData: any) => {

      this.dataSourceCrypto = new MatTableDataSource(responseData.data.items);
      console.log(responseData.data.items);
      this.sub.next(true);
    });
  }

  addCrypto() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const currentId = currentUser.token.id;
    // tslint:disable-next-line: max-line-length
    const cryptoToAdd: Crypto = {id: 0, UserId: currentId, refference: this.Refference, cryptoCurrencyName: this.addCryptoForm.value.currency, cryptoCurrencyAbbreviation: '' };

    this.http.post(this.environmentURL + 'Crypto', cryptoToAdd).subscribe((responseData: any) => {
      // de adaugat aici si de retrivuit din backend in lista ca in available
      this.cryptoAccounts = responseData.data.items;
      this.dataSourceCrypto = new MatTableDataSource(responseData.data.items);
      console.log(responseData.data.items);
    });
  }

  deleteCrypto(id: number) {
    this.http.delete(this.environmentURL + 'Crypto/' + id).subscribe((responseData: any) => {
      this.cryptoAccounts = responseData.data.item;
      this.dataSourceCrypto = new MatTableDataSource(responseData.data.items);
      console.log(responseData.data.items);
  });
    this.ngOnInit();
  }

  createAddBankForm() {
    this.addBankForm = this.formBuilder.group({
      bankName: new FormControl ('', Validators.required),
      iban: new FormControl ('', Validators.required),
      currency: new FormControl ('', Validators.required)
    });
  }

  onSubmitAddBank() {
   this.addBank(this.addBankForm.value.bankName, this.addBankForm.value.iban, this.addBankForm.value.currency);
  }

  createAddCryptoForm() {
    this.addCryptoForm = this.formBuilder.group({
      currency: new FormControl ('', Validators.required)
    });
  }

  onSubmitAddCrypto() {
   this.addCrypto();
  }
  // #endregion
}
