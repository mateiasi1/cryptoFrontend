import { AuthService } from 'src/app/auth-service';
import { CurrencyListCrypto } from '../cryptoAccount/cryptoCurrency.component';
import { Bank, BankAccount } from 'src/app/bank.component';
import { CurrencyList } from './bankAccount/currency.component';
import { Crypto, CryptoAccount } from 'src/app/crypto.component';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-fiat-account',
  templateUrl: './bank.html',
  styleUrls: ['./bank.css']
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
    this.http.get('https://localhost:44384/api/Banks', this.httpOptions).subscribe((responseData: Bank[]) => {
      this.bankAccounts = responseData;
      this.dataSource = new MatTableDataSource(responseData);
      console.log(responseData);
    });
  }

  addBank() {
    // tslint:disable-next-line:max-line-length
    const bankToAdd: Bank = {id: 0, bankName: this.BankName, iban: this.IBAN, currencyName: '', currencyAbbreviation: this.CurrencyAbbreviation };

    this.http.post('https://localhost:44384/api/Banks', bankToAdd).subscribe((responseData: Bank[]) => {
      // de adaugat aici si de retrivuit din backend in lista ca in available
      this.bankAccounts = responseData;
       this.dataSource = new MatTableDataSource(responseData);
      console.log(responseData);
    });
    this.ngOnInit();
  }

  deleteBank(id: number) {
    this.http.delete('https://localhost:44384/api/Banks/' + id).subscribe((responseData: Bank[]) => {
      this.bankAccounts = responseData;
       this.dataSource = new MatTableDataSource(responseData);
      console.log(responseData);
  });
  this.ngOnInit();
  }
  // #endregion

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

  // #region Bank to Bank Account
  addBankAccount(id: number, currencyName: string, bankName: string, iban: string) {
    // tslint:disable-next-line: max-line-length
    const accountToAdd: BankAccount = {id: 0, idUser: this.UserId, idCurrency: 0, currencyName: currencyName, idBank: id, bankName: bankName, iban: iban, sold: 0};

    this.http.post('https://localhost:44384/api/BankAccounts', accountToAdd).subscribe((responseData: BankAccount[]) => {

      console.log(responseData);
    });
    this.ngOnInit();
  }
  // #endregion

 // #region Crypto to Crypto Account
    addCryptoAccount(id: number, cryptoCurrencyName: string, cryptoName: string, refference: string) {
    // tslint:disable-next-line: max-line-length
    const cryptoAccountToAdd: CryptoAccount = {id: 0, idUser: this.UserId, idCryptoCurrency: 0, cryptoCurrencyName: cryptoCurrencyName, idCrypto: id, cryptoName: cryptoName, refference: ' ', sold: 0};

    this.http.post('https://localhost:44384/api/CryptoAccount', cryptoAccountToAdd).subscribe((responseData: CryptoAccount[]) => {

      console.log(responseData);
    });
    this.ngOnInit();
    }
  // #endregion

  // #region Crypto
  getCrypto() {
    this.http.get('https://localhost:44384/api/Crypto').subscribe((responseData: Crypto[]) => {
      this.cryptoList = responseData;

      this.dataSourceCrypto = new MatTableDataSource(responseData);
      console.log(responseData);
    });
  }

  addCrypto() {
    // tslint:disable-next-line: max-line-length
    const cryptoToAdd: Crypto = {id: 0, refference: this.Refference, cryptoCurrencyName: this.CryptoName, cryptoCurrencyAbbreviation: '' };

    this.http.post('https://localhost:44384/api/Crypto', cryptoToAdd).subscribe((responseData: Crypto[]) => {
      // de adaugat aici si de retrivuit din backend in lista ca in available
      this.cryptoAccounts = responseData;
       this.dataSourceCrypto = new MatTableDataSource(responseData);
      console.log(responseData);
    });
    this.ngOnInit();
  }

  deleteCrypto(id: number) {
    this.http.delete('https://localhost:44384/api/Crypto/' + id).subscribe((responseData: Crypto[]) => {
      this.cryptoAccounts = responseData;
       this.dataSourceCrypto = new MatTableDataSource(responseData);
      console.log(responseData);
  });
  this.ngOnInit();
  }

  // #endregion
}
