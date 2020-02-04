
import { Component, OnInit } from '@angular/core';
import { BankAccountService } from '../bank/bankAccount/bankAccount.service';

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
