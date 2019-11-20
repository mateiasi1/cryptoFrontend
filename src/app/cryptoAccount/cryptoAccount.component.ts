import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { BankAccountService } from '../bankAccount/bankAccount.service';
import { BankAccount } from '../bankAccount/currency.component';


@Component({
  selector: 'app-servers',
  templateUrl: './bankAccount.component.html',
  styleUrls: ['./bankAccount.component.css']
})
export class BankAccountComponent implements OnInit {
 public bankAccounts: BankAccount[] = [];
 displayedColumns: string[] = ['id', 'currencyName', 'bankName', 'iban', 'sold', 'actions' ];
 dataSource: MatTableDataSource<BankAccount>;

 currencyName: string;
 currencyAbbreviation: string;
 amount: number;
 currentPrice: number;
 id: number;

  constructor(public bankAccountService: BankAccountService,
              private http: HttpClient
    ) { }

  ngOnInit() {

    this.getBankAccounts();
  }

  setID(idFromHTML: number) {
    this.id = idFromHTML;
    }

//#region BankAccount

 getBankAccounts() {

  this.http.get('https://localhost:44384/api/BankAccounts').subscribe((responseData: BankAccount[]) => {
     this.bankAccounts = responseData;
     this.dataSource = new MatTableDataSource(responseData);
     console.log(responseData);
   });
 }

 deleteBankAccount(id: number) {
  this.http.delete('https://localhost:44384/api/BankAccounts/' + id).subscribe((responseData: BankAccount[]) => {
    this.bankAccounts = responseData;
     this.dataSource = new MatTableDataSource(responseData);
    console.log(responseData);
  });
  }

//#endregion

//#region Operations

//#endregion

}
