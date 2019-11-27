import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ManagerService } from '../manage-application/manager.service';
import { CryptoAccount } from './cryptoCurrency.component';




export class CryptoAccountService {
  id: number;
  tradeFee = 0; // vine din backend
  exchangeRate = 2; // vine din callul catre API cu parametrii selectedValueFrom si selectedValueTo

  public cryptoAccounts: CryptoAccount[] = [];
errorMessage = 'ERROR';
constructor(private http: HttpClient,
            public dialog: MatDialog,
            public managerService: ManagerService
  ) {
    this.managerService.getFlatRate();
  }

  public lastId: number;

//#region Operations
  setID(idFromHTML: number) {
  this.id = idFromHTML;
  }

  deposit(amount: number) {
    this.http.put( `https://localhost:44384/api/CryptoAccount/add`, {'amount' : amount, 'id' : this.id}).subscribe(responseData => {
      // tslint:disable-next-line: no-debugger
      console.log(responseData);
    });
  }

  withdraw(amount: number) {
    this.http.put( `https://localhost:44384/api/CryptoAccount/withdraw`, {'amount' : amount, 'id' : this.id}).subscribe(responseData => {
      // tslint:disable-next-line: no-debugger
      console.log(responseData);
    });
  }
//#endregion

 depositCurrency(amount: number) {
   const itemToUpdate = this.cryptoAccounts.find(item => item.id === this.id);
   itemToUpdate.sold += amount;
 }

 withdrawCurrency( id: number, amount: number) {
   debugger;
  const itemToUpdate = this.cryptoAccounts.find(item => item.id === id);
  const verifyAmount = amount - this.managerService.actualFlat;
  if (verifyAmount > itemToUpdate.sold) {
    return window.alert(this.errorMessage);
  } else {
  itemToUpdate.sold -= amount + this.managerService.actualFlat;
  }
}
 trade(selectedValueFrom: string, selectedValueTo: string, amountFrom: number) {
  const tradeFrom = this.cryptoAccounts.find(item => item.cryptoName === selectedValueFrom);
  const initialAmount = tradeFrom.sold;
  debugger;
if (tradeFrom.sold < ((this.tradeFee / 100) * amountFrom + amountFrom) ) {
  debugger;
  alert('Insufficient founds!');
} else {
  tradeFrom.sold -= (this.tradeFee / 100) * amountFrom + amountFrom;
  const tradeTo = this.cryptoAccounts.find(item => item.cryptoName === selectedValueTo);
  tradeTo.sold += (amountFrom * this.exchangeRate);

  // send HTTP POST request Nu Trebuie trimis trade to la users
  this.http.post( 'https://localhost:44384/api/users', tradeTo).subscribe(responseData => {
    // tslint:disable-next-line: no-debugger
    console.log(responseData);
  });
 }
}

}
