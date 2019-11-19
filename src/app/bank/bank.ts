import { Component, OnInit } from '@angular/core';
import { BankAccount, Bank } from '../bank.component';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';
import { Currency, CurrencyList } from '../bankAccount/currency.component';

@Component({
  selector: 'app-fiat-account',
  templateUrl: './bank.html',
  styleUrls: ['./bank.css']
})
export class BankComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'BankName', 'IBAN', 'Currency', 'Actions'];
  constructor(private http: HttpClient) { }
  dataSource: MatTableDataSource<Bank>;

  public bankAccounts: Bank[] = [];

  UserId: 0;
  BankName: string;
  IBAN: string;
  CurrencyAbbreviation: string;
  panelOpenState = false;
  public  currencyList: CurrencyList[] = [];

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.bankAccounts);
    this.getCurrencies();
    this.getBanks();
  }
  // #region Bank
  getBanks() {
    this.http.get('https://localhost:44384/api/Banks').subscribe((responseData: Bank[]) => {
      this.bankAccounts = responseData;
      debugger;
      this.dataSource = new MatTableDataSource(responseData);
      console.log(responseData);
    });
  }

  addBank() {
    const bankToAdd: Bank = {id: 0, bankName: this.BankName, iban: this.IBAN, currencyName: '', currencyAbbreviation: this.CurrencyAbbreviation }

    this.http.post('https://localhost:44384/api/Banks', bankToAdd).subscribe((responseData: Bank[]) => {
      // de adaugat aici si de retrivuit din backend in lista ca in available
      this.bankAccounts = responseData;
       this.dataSource = new MatTableDataSource(responseData);
      console.log(responseData);
    });
  }

  deleteBank(id: number) {
    this.http.delete('https://localhost:44384/api/Banks/' + id).subscribe((responseData: Bank[]) => {
      this.bankAccounts = responseData;
       this.dataSource = new MatTableDataSource(responseData);
      console.log(responseData);
  });
  }
  // #endregion

  // #region Currency
  getCurrencies() {
    this.http.get('https://localhost:44384/api/Currencies').subscribe((responseData: CurrencyList[]) => {
      this.currencyList = responseData;
      console.log(responseData);
    });
  }
  // #endregion

  // #region Bank to Bank Account
  addBankAccount(id: number, currencyName: string, bankName: string, iban: string) {
    // tslint:disable-next-line: max-line-length
    const accountToAdd: BankAccount = {id: 0, idUser: this.UserId, idCurrency: 0, currencyName: currencyName, idBank: id, bankName: bankName, iban: iban, sold: 0};
    debugger;
    this.http.post('https://localhost:44384/api/BankAccounts', accountToAdd).subscribe((responseData: BankAccount[]) => {
      debugger;
      console.log(responseData);
    });
  }
  // #endregion
}
