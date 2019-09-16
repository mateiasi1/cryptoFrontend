import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import {  DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './users/withdraw.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/users/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';
import { HomeService } from './deposit/deposit.service';
import { WithdrawService } from './users/withdraw.service';
import { TradeComponent } from './trade/trade.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatFormFieldModule, MatInputModule, MatExpansionModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { Currency } from './servers/currency.component';
import { TradeService } from './trade/trade.service';
import { HttpClientModule } from '@angular/common/http';


const appRoutes: Routes = [
  { path: '', component: DepositComponent },
  { path: 'home', component: DepositComponent},
  { path: 'users', component: WithdrawComponent },
  { path: 'servers', component: ServersComponent },
  { path: 'trade', component: TradeComponent },
  { path: '**', redirectTo: '/not-found'},
];

@NgModule({
   declarations: [
      AppComponent,
      DepositComponent,
      WithdrawComponent,
      ServersComponent,
      UserComponent,
      EditServerComponent,
      ServerComponent,
      TradeComponent
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
      HttpClientModule

   ],
   providers: [
      ServersService,
      HomeService,
      WithdrawService,
      Currency,
      TradeService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
