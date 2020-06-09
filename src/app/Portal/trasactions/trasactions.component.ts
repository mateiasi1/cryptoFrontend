import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
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
              private http: HttpClient,
              public authService: AuthService,
              public dialog: MatDialog,
    ) {
     this.sub.subscribe(e => {

        this.dataSource.paginator = this.paginator;
        this.dataSourceCrypto.paginator = this.paginator2;
      });
    }

  displayedColumns: string[] = ['From','To','Ammount', 'Status','Date'];
  displayedColumnsCrypto: string[] = ['Ammount', 'Status'];
  role: string;
  isCurrentUserAdmin: boolean;

  public sub: Subject<boolean> = new Subject<boolean>();

  @ViewChild('paginator', {static: true}) paginator: MatPaginator;
  @ViewChild('paginator2', {static: false}) paginator2: MatPaginator;

  dataSource: MatTableDataSource<CurrencyListTransactions>;
  dataSourceCrypto: MatTableDataSource<CryptoCurrencyTransactions>;
  environmentURL = environment.apiUrl;

  
  ngOnInit() {
    this.getFiatTransactions();
  }
  getFiatTransactions() {
    this.http.get(this.environmentURL + 'BankAccountTransactions').subscribe((responseData: any) => {
      this.dataSource = responseData.data.items;
      this.dataSource.paginator = this.paginator;
      console.log(responseData.data.items);
    });
}
// TODO: de facut in backend crypto transactions
getCryptoTransactions() {
  this.http.get(this.environmentURL + 'BankAccountTransactions').subscribe((responseData: any) => {
    this.dataSource = responseData.data.items;
    this.dataSource.paginator = this.paginator;
  });
}

}

