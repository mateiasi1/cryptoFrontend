import { HttpClientWServiceService } from './../../../services/HttpClientWService.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatTabGroup } from '@angular/material';
import { BankAccountService } from 'src/app/services/bankAccount.service';
import { HttpClient } from '@angular/common/http';
import { Currency, CurrencyListTransactions } from 'src/app/components/currency.component';
import { AuthService } from 'src/app/services/auth-service';
import { AvailableService } from 'src/app/services/availableCurrencies.service';
import { CryptoCurrencyTransactions } from 'src/app/components/cryptoCurrency.component';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-trasactions',
  templateUrl: './trasactions.component.html',
  styleUrls: ['./trasactions.component.css']
})
export class TrasactionsComponent implements OnInit {

  constructor(public serversService: BankAccountService,
              private http: HttpClientWServiceService,
              public authService: AuthService,
              public dialog: MatDialog
    ) {
     this.sub.subscribe(e => {

        this.dataSource.paginator = this.paginator;
        this.dataSourceCrypto.paginator = this.paginator2;
      });
    }

  displayedColumns: string[] = ['From','To','Ammount', 'transactionType','Date'];
  displayedColumnsCrypto: string[] = ['From','To','Ammount', 'transactionType','Date'];
  role: string;
  isCurrentUserAdmin: boolean;
  UserId: string;

  public sub: Subject<boolean> = new Subject<boolean>();

  @ViewChild('paginator', {static: true}) paginator: MatPaginator;
  @ViewChild('paginator2', {static: false}) paginator2: MatPaginator;
  @ViewChild('tabs', {static: true}) tabGroup: MatTabGroup;
  
  
  dataSource: MatTableDataSource<CurrencyListTransactions>;
  dataSourceCrypto: MatTableDataSource<CryptoCurrencyTransactions>;
  environmentURL = environment.apiUrl;

  
  ngOnInit() {
    this.getFiatTransactions();
    this.getCryptoTransactions();
    this.changeTab();
    this.getUserId();
  }
  getFiatTransactions() {
    this.getUserId();
    this.http.get(this.environmentURL + 'BankAccountTransactions/' + this.UserId).subscribe((responseData: any) => {
      this.dataSource = responseData.data.items;
      this.dataSource.paginator = this.paginator;
      console.log(responseData.data.items);
    });
}
// TODO: de facut in backend crypto transactions
getCryptoTransactions() {
  this.http.get(this.environmentURL + 'ConversionTransactions').subscribe((responseData: any) => {
    this.dataSourceCrypto = responseData.items;
    this.dataSourceCrypto.paginator = this.paginator2;
  });
}

getUserId() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  this.UserId = currentUser.token.id;
}

changeTab() {
  this.tabGroup.selectedIndex = this.serversService.newIndex;
}
}

