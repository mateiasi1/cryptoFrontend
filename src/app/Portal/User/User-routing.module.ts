import { UserComponent } from './User.component';
import { Routes, RouterModule } from '@angular/router';
import { BankComponent } from '../bank/bank.component';
import { Page404portalComponent } from '../page404portal/page404portal.component';
import { NgModule } from '@angular/core';
import { AvailableCurrenciesComponent } from '../available-currencies/available-currencies.component';
import { ManageApplicationComponent } from '../manage-application/manage-application.component';
import { UsersComponent } from '../users/users.component';
import { ProfileComponent } from '../profile/profile.component';
import { TrasactionsComponent } from '../trasactions/trasactions.component';
import { BankAccountComponent } from '../bank-account/bank-account.component';
import { CryptoAccountComponent } from '../crypto-account/crypto-account.component';

const routes: Routes = [
  {
    path: '', component: UserComponent, children: [
  { path: 'bank', component: BankComponent },
  { path: 'transactions', component: TrasactionsComponent },
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
