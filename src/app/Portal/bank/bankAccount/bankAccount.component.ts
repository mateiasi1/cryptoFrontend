import { BankAccountService } from './bankAccount.service';
import { BankAccount } from './currency.component';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-servers',
  templateUrl: './bankAccount.component.html',
  styleUrls: ['./bankAccount.component.css']
})
export class BankAccountComponent implements OnInit {
 public bankAccounts: BankAccount[] = [];
 displayedColumns: string[] = ['currencyName', 'bankName', 'iban', 'sold', 'actions' ];
 dataSource: MatTableDataSource<BankAccount>;

 currencyName: string;
 currencyAbbreviation: string;
 amount: number;
 currentPrice: number;
 id: number;

  constructor(public bankAccountService: BankAccountService,
              private http: HttpClient,
              public dialog: MatDialog,
    ) { }

  ngOnInit() {
    this.getBankAccounts();
    this.bankAccountService.getBankAccounts();
    this.bankAccountService.getCurrencies();
    this.bankAccountService.getCryptoCurrencies();
  }

  setID(idFromHTML: number) {
    this.id = idFromHTML;
    console.log(this.id);
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
  this.ngOnInit();
  }

//#endregion

//#region Operations

//#endregion

deposit() {
  console.log(this.id);
  const dialogRef = this.dialog.open(DepositFiatComponent);

  dialogRef.afterClosed().subscribe(result => {
    this.ngOnInit();
    console.log(`Dialog result: ${result}`);
  });
}
withdraw() {
  console.log(this.id);
  const dialogRef = this.dialog.open(WithdrawFiatComponent);

  dialogRef.afterClosed().subscribe(result => {
    this.ngOnInit();
    console.log(`Dialog result: ${result}`);
  });
}
trade() {
  console.log(this.id);
  const dialogRef = this.dialog.open(TradeFiatComponent);

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
export class DepositFiatComponent {
  constructor(public bankAccountComponent: BankAccountComponent,
    public bankAccountService: BankAccountService) { }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-content-example-dialog',
  templateUrl: 'withdraw.html',
})
export class WithdrawFiatComponent {
  constructor(public bankAccountComponent: BankAccountComponent,
    public bankAccountService: BankAccountService) { }

    withdraw() {
      this.bankAccountService.withdrawAmount().subscribe(responseData => {
        // tslint:disable-next-line: no-debugger
        console.log(responseData);
      });
    }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-content-example-dialog',
  templateUrl: 'trade.html',
})
export class TradeFiatComponent {
  constructor(public bankAccountComponent: BankAccountComponent,
    public bankAccountService: BankAccountService) { }
}
