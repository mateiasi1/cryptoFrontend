import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { BankAccountComponent } from './bankAccount/bankAccount.component';
import { TradeComponent } from './trade/trade.component';
import { LoginComponent } from 'src/Login/Login.component';
import { AvailableCurrenciesComponent } from './availableCurrencies/availableCurrencies.component';
import { BankComponent } from './bank/bank';
import { ManageApplicationComponent } from './manage-application/manage-application.component';
import { RegisterUserComponent } from './registerUser/registerUser.component';
import { UsersComponent } from './users/users.component';
import { ValidateAccountComponent } from './validateAccount/validateAccount.component';
import { CryptoAccountComponent } from './cryptoAccount/cryptoAccount.component';
import {
  AuthGuardService as AuthGuard
} from './auth-guard.service';
import {
  RoleGuardService as RoleGuard
} from './role-guard.service';

export const appRoutes: Routes = [

  // canActivate: [RoleGuard],  pentru auth bazata pe roluri(verifica si authguard)

  { path: '', component: LoginComponent },
  { path: 'home', canActivate: [AuthGuard], component: DepositComponent},
  { path: 'withdraw', canActivate: [AuthGuard],  component: WithdrawComponent },
  { path: 'bank-account', canActivate: [AuthGuard], component: BankAccountComponent },
  { path: 'trade', canActivate: [AuthGuard], component: TradeComponent, data: { expectedRole: 'admin'} },
  { path: 'login', component: LoginComponent},
  { path: 'availableCurrencies', canActivate: [AuthGuard], component: AvailableCurrenciesComponent},
  { path: 'bank', canActivate: [AuthGuard], data: { expectedRole: 'admin'} , component: BankComponent},
  { path: 'manage-application', canActivate: [RoleGuard], data: { expectedRole: 'admin'}, component: ManageApplicationComponent},
  { path: 'registerUser', component: RegisterUserComponent},
  { path: 'usersUnconfirmed', canActivate: [RoleGuard], data: { expectedRole: 'admin'}, component: UsersComponent},
  { path: 'validateAccount', canActivate: [RoleGuard], data: { expectedRole: 'admin'}, component: ValidateAccountComponent},
  { path: 'crypto', canActivate: [AuthGuard], data: { expectedRole: 'admin'}, component: CryptoAccountComponent},
  { path: '**', redirectTo: '/not-found'},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [

  ],
  providers: [ AuthGuard]
})
export class AppRoutingModule { }
