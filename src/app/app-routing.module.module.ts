import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { ServersComponent } from './servers/servers.component';
import { TradeComponent } from './trade/trade.component';
import { LoginComponent } from 'src/Login/Login.component';
import { AvailableCurrenciesComponent } from './availableCurrencies/availableCurrencies.component';
import { FiatAccountComponent } from './fiat-account/fiat-account.component';
import { ManageApplicationComponent } from './manage-application/manage-application.component';
import { RegisterUserComponent } from './registerUser/registerUser.component';
import { UsersComponent } from './users/users.component';

const appRoutes: Routes = [
  { path: '', canActivate: [AuthGuard], component: DepositComponent },
  { path: 'home', canActivate: [AuthGuard], component: DepositComponent},
  { path: 'withdraw', canActivate: [AuthGuard],  component: WithdrawComponent },
  { path: 'servers', canActivate: [AuthGuard],  component: ServersComponent },
  { path: 'trade', canActivate: [AuthGuard], component: TradeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'availableCurrencies', canActivate: [AuthGuard], component: AvailableCurrenciesComponent},
  { path: 'bank-account', canActivate: [AuthGuard], component: FiatAccountComponent},
  { path: 'manage-application', canActivate: [AuthGuard], component: ManageApplicationComponent},
  { path: 'registerUser', component: RegisterUserComponent},
  { path: 'usersUnconfirmed', component: UsersComponent},
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
