
import { Component, OnInit } from '@angular/core';
import { BankAccountService } from '../bank/bankAccount/bankAccount.service';
import { CryptoAccountService } from '../cryptoAccount/cryptoAccount.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  id = 0;
  amount: number;
  constructor(public bankAccountService: BankAccountService,
    public cryptoAccountService: CryptoAccountService
  ) { }

  ngOnInit() {
  }
}
