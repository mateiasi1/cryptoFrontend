import { AuthService } from './auth-service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/Login/Login.component';
import { RegisterUserComponent } from './registerUser/registerUser.component';
import {
  AuthGuardService as AuthGuard
} from './auth-guard.service';
import {
  RoleGuardService as RoleGuard
} from './role-guard.service';
import { DepositComponent } from './Portal/deposit/deposit.component';
import { WithdrawComponent } from './Portal/withdraw/withdraw.component';
import { BankAccountComponent } from './Portal/bank/bankAccount/bankAccount.component';
import { TradeComponent } from './Portal/trade/trade.component';
import { AvailableCurrenciesComponent } from './Portal/availableCurrencies/availableCurrencies.component';
import { BankComponent } from './Portal/bank/bank';
import { ManageApplicationComponent } from './Portal/manage-application/manage-application.component';
import { UsersComponent } from './Portal/users/users.component';
import { ValidateAccountComponent } from './Portal/validateAccount/validateAccount.component';
import { CryptoAccountComponent } from './Portal/cryptoAccount/cryptoAccount.component';
import { PortalComponent } from './Portal/Portal.component';
import { SetPasswordComponent } from 'src/SetPassword/SetPassword.component';

export const appRoutes: Routes = [

  // canActivate: [RoleGuard],  pentru auth bazata pe roluri(verifica si authguard)

  { path: '', component: LoginComponent },
  { path: 'deposit', canActivate: [RoleGuard], data: { expectedRole: 'user'}, component: DepositComponent},
  { path: 'withdraw', canActivate: [RoleGuard], data: { expectedRole: 'user'}, component: WithdrawComponent },
  { path: 'bank-account', canActivate: [AuthGuard], component: BankAccountComponent },
  { path: 'trade', canActivate: [RoleGuard], component: TradeComponent, data: { expectedRole: 'user'} },
  { path: 'login', component: LoginComponent},
  { path: 'availableCurrencies', canActivate: [AuthGuard], component: AvailableCurrenciesComponent },
  { path: 'bank', canActivate: [AuthGuard], component: BankComponent},
  { path: 'manage-application', canActivate: [RoleGuard], data: { expectedRole: 'admin'}, component: ManageApplicationComponent},
  { path: 'registerUser', component: RegisterUserComponent},
  { path: 'userManagement', canActivate: [RoleGuard], data: { expectedRole: 'admin'}, component: UsersComponent},
  { path: 'validateAccount', canActivate: [RoleGuard], data: { expectedRole: 'admin'}, component: ValidateAccountComponent},
  { path: 'crypto', canActivate: [RoleGuard], data: { expectedRole: 'user'}, component: CryptoAccountComponent},
  { path: 'portal', canActivate: [AuthGuard], component: PortalComponent},
  { path: 'setPassword/:token', component: SetPasswordComponent},
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
