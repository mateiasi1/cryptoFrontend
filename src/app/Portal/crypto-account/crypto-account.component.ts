import { Component, OnInit, ViewChild } from '@angular/core';
import { CryptoAccountService } from 'src/app/services/cryptoAccount.service';
import { CryptoAccount } from 'src/app/components/cryptoCurrency.component';
import { MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { DepositCryptoComponent } from './DepositCryptoComponent';
import { TradeCryptoComponent } from './TradeCryptoComponent';
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

  cryptoName: string;
  cryptoAbbreviation: string;
  amount: number;
  currentPrice: number;
  id: number;

   constructor(private http: HttpClient,
               public cryptoAccountService: CryptoAccountService,
               public dialog: MatDialog
     ) {
        this.sub.subscribe(e => {
      this.dataSource.paginator = this.paginator });
        }

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

   this.http.get(this.environmentURL + 'CryptoAccount').subscribe((responseData: any) => {
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
   this.ngOnInit();
   }

 //#endregion

 //#region Operations

 //#endregion

 deposit() {
   console.log(this.id);
   const dialogRef = this.dialog.open(DepositCryptoComponent);

   dialogRef.afterClosed().subscribe(result => {
     this.ngOnInit();
     console.log(`Dialog result: ${result}`);
   });
 }
 trade(id: number) {
   console.log(id);
   const dialogRef = this.dialog.open(TradeCryptoComponent);

   dialogRef.afterClosed().subscribe(result => {
     this.ngOnInit();
     console.log(`Dialog result: ${result}`);
   });
 }
}