import { AuthService } from 'src/app/auth-service';
import { CryptoCurrency } from '../cryptoAccount/cryptoCurrency.component';
import { Currency } from '../bank/bankAccount/currency.component';
import { BankAccountService } from '../bank/bankAccount/bankAccount.service';
import { AvailableService } from './availableCurrencies.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-availablecurrencies',
  templateUrl: './availableCurrencies.component.html',
  styleUrls: ['./availableCurrencies.component.css']
})
export class AvailableCurrenciesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'viewValue', 'actions'];
  displayedColumnsCrypto: string[] = ['name', 'actions'];
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
  addCurrency(currencyAbbreviation: string) {
    const dialogRef = this.dialog.open(AddCurrencyComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
    this.getCurrencies();
  }
  addCrypto() {
    const dialogRef = this.dialog.open(AddCryptoComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-content-example-dialog',
  templateUrl: 'addCurrency.html',
})
export class AddCurrencyComponent {
  constructor(
    public availableSevice: AvailableService) { }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-content-example-dialog',
  templateUrl: 'addCrypto.html',
})
export class AddCryptoComponent {
  constructor(
    public availableSevice: AvailableService) { }
}
