import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AvailableCurrenciesComponent } from './available-currencies/available-currencies.component';
import { BankComponent } from './bank/bank.component';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { CryptoAccountComponent } from './crypto-account/crypto-account.component';
import { ManageApplicationComponent } from './manage-application/manage-application.component';
import { UsersComponent } from './users/users.component';
import { Page404portalComponent } from './page404portal/page404portal.component';
import { PortalComponent } from './portal.component';
import {AuthGuardService as AuthGuard} from '../services/auth-guard.service';
import {RoleGuardService as RoleGuard} from '../services/role-guad.service';

const routes: Routes = [
  {
    path: '', component: PortalComponent, children: [
  { path: 'available-currencies', canActivate: [AuthGuard], component: AvailableCurrenciesComponent },
  { path: 'bank', canActivate: [AuthGuard], component: BankComponent },
  { path: 'bank-account', canActivate: [AuthGuard], component: BankAccountComponent },
  { path: 'crypto-account', canActivate: [RoleGuard], data: { expectedRole: 'user'}, component: CryptoAccountComponent },
  { path: 'manage-application', canActivate: [RoleGuard], data: { expectedRole: 'admin'}, component: ManageApplicationComponent },
  { path: 'users-management', canActivate: [AuthGuard], component: UsersComponent },
  { path: '', redirectTo: 'bank-account', pathMatch: 'full'},
  { path: '**', component: Page404portalComponent }
    ]
  }
];
// [RoleGuard], data: { expectedRole: 'user'}
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
