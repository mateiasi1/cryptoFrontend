import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';
import { AuthService } from 'src/app/services/auth-service';
import { Bank, BankAccount } from 'src/app/components/bank.component';
import { CurrencyList } from 'src/app/components/currency.component';
import { CurrencyListCrypto } from 'src/app/components/cryptoCurrency.component';
import { CryptoAccount, Crypto } from 'src/app/components/crypto.component';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  constructor(private http: HttpClient,
              public authService: AuthService) { }
  displayedColumns: string[] = ['BankName', 'IBAN', 'Currency', 'Actions'];
  displayedColumnsCrypto: string[] = ['CryptoName', 'Actions'];

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
  }
  // #region Bank
  getBanks() {
    this.http.get('https://localhost:44384/api/Banks', this.httpOptions).subscribe((responseData: any) => {
      this.bankAccounts = responseData.data.items;
      this.dataSource = new MatTableDataSource(responseData.data.items);
      console.log(responseData.data.items);
    });
  }

  addBank() {
    // tslint:disable-next-line:max-line-length
    const bankToAdd: Bank = {id: 0, bankName: this.BankName, iban: this.IBAN, currencyName: '', currencyAbbreviation: this.CurrencyAbbreviation };

    this.http.post('https://localhost:44384/api/Banks', bankToAdd).subscribe((responseData: any) => {
      // de adaugat aici si de retrivuit din backend in lista ca in available
      this.bankAccounts = responseData.data.items;
       // tslint:disable-next-line:align
       this.dataSource = new MatTableDataSource(responseData.data.items);
      console.log(responseData.data.items);
    });
    this.ngOnInit();
  }

  deleteBank(id: number) {
    this.http.delete('https://localhost:44384/api/Banks/' + id).subscribe((responseData: any) => {
      this.bankAccounts = responseData.data.items;
      this.dataSource = new MatTableDataSource(responseData.data.items);
      console.log(responseData.data.items);
  });
    this.ngOnInit();
  }
  // #endregion

  // #region Currency
  getCurrencies() {
    this.http.get('https://localhost:44384/api/Currencies').subscribe((responseData: any) => {
      this.currencyList = responseData.data.items;
      console.log(responseData.data.items);
    });
  }

  getCryptoCurrencies() {
    this.http.get('https://localhost:44384/api/CryptoCurrencies').subscribe((responseData: any) => {
      this.cryptoList = responseData.data.items;
      console.log(responseData.data.items);
    });
  }
  // #endregion

  // #region Bank to Bank Account
  addBankAccount(id: number, currencyName: string, bankName: string, iban: string) {
    // tslint:disable-next-line: max-line-length
    const accountToAdd: BankAccount = {id: 0, idUser: this.UserId, idCurrency: 0, currencyName: currencyName, idBank: id, bankName: bankName, iban: iban, sold: 0};

    this.http.post('https://localhost:44384/api/BankAccounts', accountToAdd).subscribe((responseData: any) => {

      console.log(responseData.data.items);
    });
    this.ngOnInit();
  }
  // #endregion

 // #region Crypto to Crypto Account
    addCryptoAccount(id: number, cryptoCurrencyName: string, cryptoName: string, refference: string) {
    // tslint:disable-next-line: max-line-length
    const cryptoAccountToAdd: CryptoAccount = {id: 0, idUser: this.UserId, idCryptoCurrency: 0, cryptoCurrencyName: cryptoCurrencyName, idCrypto: id, cryptoName: cryptoName, refference: ' ', sold: 0};

    this.http.post('https://localhost:44384/api/CryptoAccount', cryptoAccountToAdd).subscribe((responseData: any) => {

      console.log(responseData.data.items);
    });
    this.ngOnInit();
    }
  // #endregion

  // #region Crypto
  getCrypto() {
    this.http.get('https://localhost:44384/api/Crypto').subscribe((responseData: any) => {
      this.cryptoList = responseData.data.items;

      this.dataSourceCrypto = new MatTableDataSource(responseData.data.items);
      console.log(responseData.data.items);
    });
  }

  addCrypto() {
    // tslint:disable-next-line: max-line-length
    const cryptoToAdd: Crypto = {id: 0, refference: this.Refference, cryptoCurrencyName: this.CryptoName, cryptoCurrencyAbbreviation: '' };

    this.http.post('https://localhost:44384/api/Crypto', cryptoToAdd).subscribe((responseData: any) => {
      // de adaugat aici si de retrivuit din backend in lista ca in available
      this.cryptoAccounts = responseData.data.items;
      this.dataSourceCrypto = new MatTableDataSource(responseData.data.items);
      console.log(responseData.data.items);
    });
    this.ngOnInit();
  }

  deleteCrypto(id: number) {
    this.http.delete('https://localhost:44384/api/Crypto/' + id).subscribe((responseData: any) => {
      this.cryptoAccounts = responseData.data.item;
      this.dataSourceCrypto = new MatTableDataSource(responseData.data.items);
      console.log(responseData.data.items);
  });
    this.ngOnInit();
  }

  // #endregion
}
