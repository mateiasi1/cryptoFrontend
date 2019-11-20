import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { CryptoAccount } from './crypto.component';
import { CryptoAccountService } from './cryptoAccount.service';


@Component({
  selector: 'app-servers',
  templateUrl: './bankAccount.component.html',
  styleUrls: ['./bankAccount.component.css']
})
export class CryptoAccountComponent implements OnInit {
 public cryptoAccounts: CryptoAccount[] = [];
 displayedColumns: string[] = ['id', 'currencyName', 'bankName', 'iban', 'sold', 'actions' ];
 dataSource: MatTableDataSource<CryptoAccount>;

 currencyName: string;
 currencyAbbreviation: string;
 amount: number;
 currentPrice: number;
 id: number;

  constructor(public bankAccountService: CryptoAccountService,
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

  this.http.get('https://localhost:44384/api/BankAccounts').subscribe((responseData: CryptoAccount[]) => {
     this.cryptoAccounts = responseData;
     this.dataSource = new MatTableDataSource(responseData);
     console.log(responseData);
   });
 }

 deleteBankAccount(id: number) {
  this.http.delete('https://localhost:44384/api/BankAccounts/' + id).subscribe((responseData: CryptoAccount[]) => {
    this.cryptoAccounts = responseData;
     this.dataSource = new MatTableDataSource(responseData);
    console.log(responseData);
  });
  }

//#endregion

//#region Operations

//#endregion

}
