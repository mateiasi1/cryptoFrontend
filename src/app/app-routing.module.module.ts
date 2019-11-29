import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
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

const appRoutes: Routes = [
  { path: '', canActivate: [AuthGuard], component: DepositComponent },
  { path: 'home', canActivate: [AuthGuard], component: DepositComponent},
  { path: 'withdraw', canActivate: [AuthGuard],  component: WithdrawComponent },
  { path: 'bank-account', canActivate: [AuthGuard],  component: BankAccountComponent },
  { path: 'trade', canActivate: [AuthGuard], component: TradeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'availableCurrencies', canActivate: [AuthGuard], component: AvailableCurrenciesComponent},
  { path: 'bank', canActivate: [AuthGuard], component: BankComponent},
  { path: 'manage-application', canActivate: [AuthGuard], component: ManageApplicationComponent},
  { path: 'registerUser', component: RegisterUserComponent},
  { path: 'usersUnconfirmed',canActivate: [AuthGuard], component: UsersComponent},
  { path: 'validateAccount',canActivate: [AuthGuard], component: ValidateAccountComponent},
  { path: 'crypto',canActivate: [AuthGuard], component: CryptoAccountComponent},
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
