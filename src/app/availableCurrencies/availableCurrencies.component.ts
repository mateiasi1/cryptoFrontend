import { Component, OnInit } from '@angular/core';
import { Currency } from '../servers/currency.component';
import { ServersService } from '../servers/servers.service';

@Component({
  selector: 'app-availableCurrencies',
  templateUrl: './availableCurrencies.component.html',
  styleUrls: ['./availableCurrencies.component.css']
})
export class AvailableCurrenciesComponent implements OnInit {
  selectedValue = '';
  public currencyFromBackend: Currency[] = [
    {id: 1, name: 'a', viewValue: 'a', currentPrice: 4, amount: 100},
    {id: 2, name: 'b', viewValue: 'b', currentPrice: 1, amount: 200},
    {id: 3, name: 'c', viewValue: 'c', currentPrice: 2, amount: 300},
    {id: 4, name: 'd', viewValue: 'd', currentPrice: 4.5, amount: 400}
];

public  allCurrency: Currency[] = [
  {id: 1, name: 'e', viewValue: 'e', currentPrice: 3, amount: 444},
  {id: 2, name: 'f', viewValue: 'f', currentPrice: 5, amount: 454},
  {id: 3, name: 'g', viewValue: 'g', currentPrice: 6, amount: 353},
  {id: 4, name: 'h', viewValue: 'h', currentPrice: 7.5, amount: 656}
];
  constructor(public serversService: ServersService) { }

  ngOnInit() {
  }

  addCurrency(name: string, viewValue: string, id: number, currentPrice: number, amount: number) {
    this.serversService.addCurrency(name, viewValue, currentPrice, amount);

    const currencyToDelete = this.currencyFromBackend.find(item => item.id === id);
    const itemIndex = this.currencyFromBackend.indexOf(currencyToDelete);
    debugger;
    this.currencyFromBackend.splice(itemIndex, 1);
  }

  addCurrencyToList() {
    const currencyToAdd = this.allCurrency.find(item => item.name === this.selectedValue);
    debugger;
    currencyToAdd.id = this.currencyFromBackend.length + 1;
    this.currencyFromBackend.push(currencyToAdd);
    const itemIndex = this.allCurrency.indexOf(currencyToAdd);
  
    this.allCurrency.splice(itemIndex, 1);
  }
}
