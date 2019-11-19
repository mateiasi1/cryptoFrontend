import { BankAccountService } from '../bankAccount/bankAccount.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
   id = 0;
   amount: number;
  constructor(public bankAccountService: BankAccountService
    ) { }

  ngOnInit() {
  }
  deposit() {
    this.bankAccountService.deposit(this.amount);
  }
}
