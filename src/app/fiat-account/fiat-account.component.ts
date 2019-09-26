import { Component, OnInit } from '@angular/core';
import { BankAccount } from '../bankAccount.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fiat-account',
  templateUrl: './fiat-account.component.html',
  styleUrls: ['./fiat-account.component.css']
})
export class FiatAccountComponent implements OnInit {
  constructor(private http: HttpClient,) { }
  public accountsFromBackend: BankAccount[] = [
    {id: 1, name: 'a', IBAN: 'a', Currency: 'a', },
    {id: 2, name: 'b', IBAN: 'b', Currency: 'b', },
    {id: 3, name: 'c', IBAN: 'c', Currency: 'c', }
];
  name: string;
  IBAN: string;
  currency: string;
  panelOpenState = false;
  public lastId: number;
    

  ngOnInit() {
  }
  addAccount() {
    this.lastId = this.accountsFromBackend.reverse().find(item => item.id).id + 1;
    const accountToAdd: BankAccount = {id: this.lastId, name: this.name, IBAN: this.IBAN, Currency: this.currency};
    this.accountsFromBackend.reverse();
    this.accountsFromBackend.push(accountToAdd);

    this.http.post('https://localhost:44384/api/BankAccounts', accountToAdd).subscribe(respondeData => {
      console.log(respondeData);
    });
  }


}
