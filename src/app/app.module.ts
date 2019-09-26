import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import {  DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { ServersComponent } from './servers/servers.component';
import { ServersService } from './servers/servers.service';
import { HomeService } from './deposit/deposit.service';
import { TradeComponent } from './trade/trade.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatFormFieldModule, MatInputModule, MatExpansionModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { Currency } from './servers/currency.component';
import { TradeService } from './trade/trade.service';
import { HttpClientModule } from '@angular/common/http';
import { WithdrawService } from './withdraw/withdraw.service';
import { UsersComponent } from './users/users.component';
import { UserCreate } from './users/userCreate.component';
import { UserLogin } from './users/userLogin.component';
import { AvailableCurrenciesComponent } from './availableCurrencies/availableCurrencies.component';
import { FiatAccountComponent } from './fiat-account/fiat-account.component';
import { BankAccount } from './bankAccount.component';
import { ManageApplicationComponent } from './manage-application/manage-application.component';
import { RegisterUserComponent } from './registerUser/registerUser.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth-service';
import { LoginModule } from 'src/Login/Login.module';

const appRoutes: Routes = [
  { path: '', canActivate: [AuthGuard], component: DepositComponent },
  { path: 'home', canActivate: [AuthGuard], component: DepositComponent},
  { path: 'withdraw', canActivate: [AuthGuard],  component: WithdrawComponent },
  { path: 'servers', canActivate: [AuthGuard],  component: ServersComponent },
  { path: 'trade', canActivate: [AuthGuard], component: TradeComponent },
  { path: 'users', component: UsersComponent},
  { path: 'availableCurrencies', canActivate: [AuthGuard], component: AvailableCurrenciesComponent},
  { path: 'bank-account', canActivate: [AuthGuard], component: FiatAccountComponent},
  { path: 'manage-application', canActivate: [AuthGuard], component: ManageApplicationComponent},
  { path: 'registerUser', component: RegisterUserComponent},
  { path: '**', redirectTo: '/not-found'},
];

@NgModule({
   declarations: [
      AppComponent,
      DepositComponent,
      WithdrawComponent,
      ServersComponent,
      TradeComponent,
      UsersComponent,
      AvailableCurrenciesComponent,
      FiatAccountComponent,
      ManageApplicationComponent,
      RegisterUserComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      RouterModule.forRoot(appRoutes),
      MatDialogModule,
      BrowserAnimationsModule,
      MatFormFieldModule,
      MatSelectModule,
      MatInputModule,
      MatExpansionModule,
      HttpClientModule,
      MatCheckboxModule,
      LoginModule
   ],
   providers: [
      ServersService,
      HomeService,
      WithdrawService,
      Currency,
      TradeService,
      UserCreate,
      UserLogin,
      ManageApplicationComponent,
      AuthService,
      AuthGuard
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
