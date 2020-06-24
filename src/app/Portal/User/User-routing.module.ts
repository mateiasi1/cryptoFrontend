import { UserComponent } from './User.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CryptoAccountComponent } from './crypto-account/crypto-account.component';
import { BankComponent } from './bank/bank.component';
import { BankAccountComponent } from './bank-account/bank-account.component';

const routes: Routes = [
  {
    path: '', component: UserComponent, children: [
  { path: 'bank', component: BankComponent },
  { path: 'bank-account', component: BankAccountComponent },
  { path: 'crypto-account', component: CryptoAccountComponent }
    ]
  }
];
// [RoleGuard], data: { expectedRole: 'user'}
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
