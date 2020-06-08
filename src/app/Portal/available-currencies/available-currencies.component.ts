import { Component, OnInit, ViewChild } from '@angular/core';
import { AvailableService } from 'src/app/services/availableCurrencies.service';
import { Currency } from 'src/app/components/currency.component';
import { BankAccountService } from 'src/app/services/bankAccount.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth-service';
import { MatDialog, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-available-currencies',
  templateUrl: './available-currencies.component.html',
  styleUrls: ['./available-currencies.component.css']
})
export class AvailableCurrenciesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'viewValue', 'actions'];
  displayedColumnsCrypto: string[] = ['name', 'actions'];
  role: string;
  isCurrentUserAdmin: boolean;

  @ViewChild('paginator', {static: true}) paginator: MatPaginator;
  @ViewChild('paginator2', {static: false}) paginator2: MatPaginator;


  currency: Currency;
  crypto: Crypto;
  constructor(public serversService: BankAccountService,
              private http: HttpClient,
              public authService: AuthService,
              public dialog: MatDialog,
              public availableSevice: AvailableService) { 
                this.availableSevice.sub.subscribe(e => {

                  this.availableSevice.dataSource.paginator = this.paginator;
                  this.availableSevice.dataSourceCrypto.paginator = this.paginator2;
                });
              }

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

