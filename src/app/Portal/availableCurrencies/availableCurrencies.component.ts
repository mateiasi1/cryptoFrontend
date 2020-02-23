import { AuthService } from 'src/app/auth-service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { CryptoCurrency } from '../cryptoAccount/cryptoCurrency.component';
import { Currency, CurrencyList, CryptoCurrencyList } from '../bank/bankAccount/currency.component';
import { BankAccountService } from '../bank/bankAccount/bankAccount.service';
import { AvailableService } from './availableCurrencies.service';

@Component({
  selector: 'app-availablecurrencies',
  templateUrl: './availableCurrencies.component.html',
  styleUrls: ['./availableCurrencies.component.css']
})
export class AvailableCurrenciesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'viewValue', 'actions'];
  displayedColumnsCrypto: string[] = ['id', 'name', 'actions'];
  role: string;
  isCurrentUserAdmin: boolean;

  currency: Currency;
  crypto: Crypto;
  constructor(public serversService: BankAccountService,
              private http: HttpClient,
              public authService: AuthService,
              public dialog: MatDialog,
              public availableSevice: AvailableService) { }

  ngOnInit() {
    this.availableSevice.dataSource = new MatTableDataSource(this.availableSevice.currencyFromBackend);
    this.getCurrencies();
  }

  // addCurrency(name: string, viewValue: string, id: number, currentPrice: number) {
  //   this.serversService.addCurrency(id, name, viewValue, currentPrice);
  //   debugger;
  //   const currencyToDelete = this.currencyFromBackend.find(item => item.id === id);
  //   const itemIndex = this.currencyFromBackend.indexOf(currencyToDelete);
  //   debugger;
  //   this.currencyFromBackend.splice(itemIndex, 1);
  // }


  getCurrencies() {
    this.availableSevice.getCurrencies();
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-content-example-dialog',
  templateUrl: 'addCurrency.html',
})
export class DialogContentExampleDialogComponent {
  constructor(
    public availableSevice: AvailableService) { }
}
