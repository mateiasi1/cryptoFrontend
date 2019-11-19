import { BankAccountService } from '../bankAccount/bankAccount.service';
import { Injectable } from '@angular/core';

@Injectable()
export class WithdrawService {
constructor(public bankAccountService: BankAccountService) {}
amount: number;
id: number;

setID(idFromHTML: number) {
this.id = idFromHTML;
}
putData() {
    debugger;
    this.bankAccountService.withdrawCurrency(this.id, this.amount);
    this.amount = 0;
    this.id = 0;
}
}
