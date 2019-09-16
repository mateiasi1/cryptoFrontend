import { Currency } from './currency.component';
import { HttpClient } from '@angular/common/http';




export class ServersService {
  exchangeRate = 2; // vine din callul catre API cu parametrii selectedValueFrom si selectedValueTo
  private currencyFromBackend: Currency[] = [
    {id: 1, name: 'Euro', viewValue: 'EUR', currentPrice: 4, amount: 100},
    {id: 2, name: 'Leu', viewValue: 'LEU', currentPrice: 1, amount: 200},
    {id: 3, name: 'Dolar', viewValue: 'USD', currentPrice: 2, amount: 300},
    {id: 4, name: 'Lira', viewValue: 'GPB', currentPrice: 4.5, amount: 400}
];
constructor(private http: HttpClient) {}
  private servers = [
    {
      id: 1,
      name: 'Productionserver',
      status: 'online'
    },
    {
      id: 2,
      name: 'Testserver',
      status: 'offline'
    },
    {
      id: 3,
      name: 'Devserver',
      status: 'offline'
    }
  ];

  getServers() {
    return this.servers;
  }

  getServer(id: number) {
    const server = this.servers.find(
      (s) => {
        return s.id === id;
      }
    );
    return server;
  }

  updateServer(id: number, serverInfo: {name: string, status: string}) {
    const server = this.servers.find(
      (s) => {
        return s.id === id;
      }
    );
    if (server) {
      server.name = serverInfo.name;
      server.status = serverInfo.status;
    }
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
  itemToUpdate.amount -= amount;
}
 trade(selectedValueFrom: string, selectedValueTo: string, amountFrom: number) {
  const tradeFrom = this.currencyFromBackend.find(item => item.name === selectedValueFrom);
  tradeFrom.amount -= amountFrom ;

  const tradeTo = this.currencyFromBackend.find(item => item.name === selectedValueTo);
  tradeTo.amount += (amountFrom * this.exchangeRate);
  // send HTTP POST request
  debugger;
  this.http.post( 'https://localhost:44384/api/users', tradeTo).subscribe(responseData => {
    // tslint:disable-next-line: no-debugger
    debugger;
    console.log(responseData);
  });
 }
 
}
