import { Component } from '@angular/core';
import { BankAccountService } from '../bankAccount/bankAccount.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent {
  id = 0;
   amount: number;
  constructor(public bankAccountService: BankAccountService
    ) {}
  
  withdraw() {
    this.bankAccountService.withdraw(this.amount);
  }
}
