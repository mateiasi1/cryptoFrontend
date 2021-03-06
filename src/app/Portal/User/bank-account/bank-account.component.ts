import { Component, OnInit, ViewChild } from '@angular/core';
import { BankAccount } from 'src/app/components/currency.component';
import { MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';
import { BankAccountService } from 'src/app/services/bankAccount.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent implements OnInit {

  @ViewChild('paginator', {static:true}) paginator: MatPaginator;
  
  environmentURL = environment.apiUrl;
  public bankAccounts: BankAccount[] = [];
  displayedColumns: string[] = ['currencyName', 'bankName', 'iban', 'sold', 'actions' ];
  dataSource: MatTableDataSource<BankAccount>;

  currencyName: string;
  currencyAbbreviation: string;
  amount: number;
  currentPrice: number;
  id: number;
  UserId: string;
  token: string;

   constructor(public bankAccountService: BankAccountService,
               private http: HttpClient,
               public dialog: MatDialog,
     ) {
      this.bankAccountService.sub.subscribe(e => {
      this.dataSource.paginator = this.paginator;
    });
    this.bankAccountService.deposit.subscribe(e => {
      this.ngOnInit();
    })
  }

   ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser.token.token;
    this.UserId = currentUser.token.id;
     this.getBankAccounts();
     this.bankAccountService.getBankAccounts();
     this.bankAccountService.getCurrencies();
     this.bankAccountService.getCryptoCurrencies();

   }

   setID(idFromHTML: number) {
     this.id = idFromHTML;
     }

 //#region BankAccount

  getBankAccounts() {

   this.http.get(this.environmentURL + 'BankAccounts/' + this.UserId).subscribe((responseData: any) => {
      this.bankAccounts = responseData.data.items;
      this.dataSource = new MatTableDataSource(responseData.data.items);
    });
  }

  deleteBankAccount(id: number) {
   this.http.delete(this.environmentURL + 'BankAccounts/' + id).subscribe((responseData: any) => {
     this.bankAccounts = responseData;
     this.dataSource = new MatTableDataSource(responseData.data.items);
   });
   this.ngOnInit();
   }

 //#endregion

 //#region Operations

 //#endregion

 deposit() {
   const dialogRef = this.dialog.open(DepositFiatComponent);

   dialogRef.afterClosed().subscribe(result => {
     this.ngOnInit();
   });
 }
 withdraw() {
   const dialogRef = this.dialog.open(WithdrawFiatComponent);

   dialogRef.afterClosed().subscribe(result => {
     this.ngOnInit();
   });
 }
 trade() {
   const dialogRef = this.dialog.open(TradeFiatComponent);

   dialogRef.afterClosed().subscribe(result => {
     this.ngOnInit();
   });
 }

 changeTab(index:number) {
  this.bankAccountService.changeTab(index);
 }
}


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-content-example-dialog',
  templateUrl: 'deposit.html',
})
export class DepositFiatComponent {
  constructor(public bankAccountService: BankAccountService) { }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-content-example-dialog',
  templateUrl: 'withdraw.html',
})
export class WithdrawFiatComponent {
  constructor(public bankAccountService: BankAccountService) { }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-content-example-dialog',
  templateUrl: 'trade.html',
})
export class TradeFiatComponent {
  constructor(public bankAccountService: BankAccountService) { }
}

