import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { CryptoAccount } from './cryptoCurrency.component';
import { CryptoAccountService } from './cryptoAccount.service';


@Component({
  selector: 'app-servers',
  templateUrl: './cryptoAccount.component.html',
  styleUrls: ['./cryptoAccount.component.css']
})
export class CryptoAccountComponent implements OnInit {
 public cryptoAccounts: CryptoAccount[] = [];
 displayedColumns: string[] = ['id', 'cryptoName', 'iban', 'sold', 'actions' ];
 dataSource: MatTableDataSource<CryptoAccount>;

 cryptoName: string;
 cryptoAbbreviation: string;
 amount: number;
 currentPrice: number;
 id: number;

  constructor(private http: HttpClient,
              public cryptoAccountService: CryptoAccountService,
              public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.getCryptoAccounts();
    this.cryptoAccountService.getCryptoCurrencies();
    this.cryptoAccountService.getCurrencies();
    this.cryptoAccountService.getCryptoCurrencies();
  }

  setID(idFromHTML: number) {
    this.id = idFromHTML;
    }

//#region BankAccount

getCryptoAccounts() {

  this.http.get('https://localhost:44384/api/CryptoAccount').subscribe((responseData: CryptoAccount[]) => {
     this.cryptoAccounts = responseData;
     this.dataSource = new MatTableDataSource(responseData);
     debugger;
     console.log(responseData);
   });
 }

 deleteBankAccount(id: number) {
  this.http.delete('https://localhost:44384/api/BankAccounts/' + id).subscribe((responseData: CryptoAccount[]) => {

     this.dataSource = new MatTableDataSource(responseData);
    console.log(responseData);
  });
  }

//#endregion

//#region Operations

//#endregion

deposit() {
  console.log(this.id);
  debugger;
  const dialogRef = this.dialog.open(DepositCryptoComponent);

  dialogRef.afterClosed().subscribe(result => {
    this.ngOnInit();
    console.log(`Dialog result: ${result}`);
  });
}
trade() {
  console.log(this.id);
  debugger;
  const dialogRef = this.dialog.open(TradeCryptoComponent);

  dialogRef.afterClosed().subscribe(result => {
    this.ngOnInit();
    console.log(`Dialog result: ${result}`);
  });
}
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-content-example-dialog',
  templateUrl: 'deposit.html',
})
export class DepositCryptoComponent {
  constructor(public cryptoAccountComponent: CryptoAccountComponent,
    public cryptoAccountService: CryptoAccountService) { }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-content-example-dialog',
  templateUrl: 'trade.html',
})
export class TradeCryptoComponent {
  constructor(public cryptoAccountComponent: CryptoAccountComponent,
    public cryptoAccountService: CryptoAccountService) { }
}
