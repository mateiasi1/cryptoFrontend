import { Transfer } from './../../components/users';
import { BankAccountService } from 'src/app/services/bankAccount.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CryptoAccountService } from 'src/app/services/cryptoAccount.service';
import { CryptoAccount } from 'src/app/components/cryptoCurrency.component';
import { MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-crypto-account',
  templateUrl: './crypto-account.component.html',
  styleUrls: ['./crypto-account.component.css']
})
export class CryptoAccountComponent implements OnInit {

  @ViewChild('paginator', {static:true}) paginator: MatPaginator;

  environmentURL = environment.apiUrl;
  public cryptoAccounts: CryptoAccount[] = [];
  displayedColumns: string[] = ['cryptoName', 'iban', 'sold', 'actions' ];
  dataSource: MatTableDataSource<CryptoAccount>;

  public sub: Subject<boolean> = new Subject<boolean>();
  userId: number;
  cryptoName: string;
  cryptoAbbreviation: string;
  amount: number;
  currentPrice: number;
  id: number;
  transfer = new Transfer;

   constructor(private http: HttpClient,
               public cryptoAccountService: CryptoAccountService,
               public dialog: MatDialog,
               public bankAccountService: BankAccountService
     ) {
        this.sub.subscribe(e => {
      this.dataSource.paginator = this.paginator });
        }

   ngOnInit() {
     this.getUserId();
     this.getCryptoAccounts();
     this.cryptoAccountService.getCryptoCurrencies();
   }

   setID(idFromHTML: number) {
     this.id = idFromHTML;
     }

 //#region BankAccount
getUserId() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  this.userId = currentUser.token.id;
}
 getCryptoAccounts() {

   this.http.get(this.environmentURL + 'CryptoAccount/' + this.userId).subscribe((responseData: any) => {
      this.cryptoAccounts = responseData.data.items;
      this.dataSource = new MatTableDataSource(responseData.data.items);
      console.log(responseData.data.items);
      this.sub.next(true);
    });
  }

  deleteBankAccount(id: number) {
   this.http.delete(this.environmentURL + 'BankAccounts/' + id).subscribe((responseData: any) => {

      this.dataSource = new MatTableDataSource(responseData.data.items);
      console.log(responseData.data.items);
   });
   }

   deleteCryptoAccount(id: number) {
    this.http.delete(this.environmentURL + 'CryptoAccount/' + id).subscribe((responseData: any) => {
     
      this.cryptoAccountService.cryptoList = responseData.data.items;
   });
   }

 trade(id: number) {
  console.log(this.id);
  const dialogRef = this.dialog.open(TradeCryptoComponent);

  dialogRef.afterClosed().subscribe(result => {
    this.ngOnInit();
    console.log(`Dialog result: ${result}`);
  });
 }
 changeTab(index:number) {
  this.bankAccountService.changeTab(index);
 }

 transferOpenDialog() {
  const dialogRef = this.dialog.open(TransferCryptoComponent);

  dialogRef.afterClosed().subscribe(result => {
    this.ngOnInit();
    console.log(`Dialog result: ${result}`);
  });
 }

 transferCrypto() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const currentId = currentUser.token.id;
   this.transfer.IdUserFrom = currentId;
  this.http.post(this.environmentURL + 'Users/transfer', this.transfer ).subscribe(respondeData => {
    
  });
  this.ngOnInit();
 }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-content-example-dialog',
  templateUrl: 'trade.html',
})
export class TradeCryptoComponent {
  constructor(public cryptoAccountService: CryptoAccountService,
              public cryptoAccountComponent: CryptoAccountComponent
              ) { }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.cryptoAccountService.getCryptoCurrencies();
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-content-example-dialog',
  templateUrl: 'transferCrypto.html',
})
export class TransferCryptoComponent {
  constructor(public cryptoAccountService: CryptoAccountService,
              public cryptoAccountComponent: CryptoAccountComponent
              ) { }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    
  }
}
