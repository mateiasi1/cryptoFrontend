import { Currency } from './currency.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ManageApplicationComponent } from '../manage-application/manage-application.component';




export class ServersService {
  tradeFee = 0; // vine din backend
  exchangeRate = 2; // vine din callul catre API cu parametrii selectedValueFrom si selectedValueTo
  private currencyFromBackend: Currency[] = [
    {id: 1, name: 'Euro', viewValue: 'EUR', currentPrice: 4, amount: 100},
    {id: 2, name: 'Leu', viewValue: 'LEU', currentPrice: 1, amount: 200},
    {id: 3, name: 'Dolar', viewValue: 'USD', currentPrice: 2, amount: 300},
    {id: 4, name: 'Lira', viewValue: 'GPB', currentPrice: 4.5, amount: 400}
];
errorMessage = 'ERROR';
constructor(private http: HttpClient,
            public dialog: MatDialog,
            private manageApp: ManageApplicationComponent
  ) {}

  public lastId: number;

  addCurrency(name: string, viewValue: string, currentPrice: number, amount: number) {
    this.lastId = this.currencyFromBackend.reverse().find(item => item.id).id + 1;
    this.currencyFromBackend.reverse();
    const currency: Currency = {id: this.lastId, name: name, viewValue: viewValue, currentPrice: currentPrice, amount: amount};
    this.currencyFromBackend.push(currency);

    this.http.post('https://localhost:44384/api/currencies', currency).subscribe(respondeData => {
      console.log(respondeData);
    });
  }
  deleteCurrency(id: number) {
    const currencyToDelete = this.currencyFromBackend.find(item => item.id === id);
    const itemIndex = this.currencyFromBackend.indexOf(currencyToDelete);
    this.currencyFromBackend.splice(itemIndex, 1);

    this.http.put('https://localhost:44384/api/currencies', id).subscribe(responseData => {
      console.log(responseData);
    });
  }

 getCurrencies() {
   return this.currencyFromBackend;
 }

 depositCurrency( id: number, amount: number) {
   const itemToUpdate = this.currencyFromBackend.find(item => item.id === id);
   itemToUpdate.amount += amount;
 }

 withdrawCurrency( id: number, amount: number) {
  const itemToUpdate = this.currencyFromBackend.find(item => item.id === id);
  const verifyAmount = amount - this.manageApp.actualFlat;
  if (verifyAmount > itemToUpdate.amount) {
    return window.alert(this.errorMessage);
  } else {
  itemToUpdate.amount -= amount - this.manageApp.actualFlat;
  }
}
 trade(selectedValueFrom: string, selectedValueTo: string, amountFrom: number) {
  const tradeFrom = this.currencyFromBackend.find(item => item.name === selectedValueFrom);
  const initialAmount = tradeFrom.amount;
  debugger;
if (tradeFrom.amount < ((this.tradeFee / 100) * amountFrom + amountFrom) ) {
  debugger;
  alert('Insufficient founds!');
} else {
  tradeFrom.amount -= (this.tradeFee / 100) * amountFrom + amountFrom;
  const tradeTo = this.currencyFromBackend.find(item => item.name === selectedValueTo);
  tradeTo.amount += (amountFrom * this.exchangeRate);

  // send HTTP POST request Nu Trebuie trimis trade to la users
  this.http.post( 'https://localhost:44384/api/users', tradeTo).subscribe(responseData => {
    // tslint:disable-next-line: no-debugger
    console.log(responseData);
  });
 }
}

}
