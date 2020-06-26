import { SharedModule } from './../Shared/Shared.module';
import { UserRoutingModule } from './User-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './User.component';
import { MatTableModule, MatExpansionModule, MatFormFieldModule, MatSelectModule, MatPaginatorModule, MatInputModule, MatMenuModule, MatButtonModule, MatDialogModule, MatTabsModule, MatToolbarModule, MatCardModule, MatTooltipModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CryptoAccountComponent, TransferCryptoComponent, TradeCryptoComponent } from './crypto-account/crypto-account.component';
import { BankComponent } from './bank/bank.component';
import { DepositFiatComponent, WithdrawFiatComponent, TradeFiatComponent, BankAccountComponent } from './bank-account/bank-account.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    MatTableModule,
    MatExpansionModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatPaginatorModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatCardModule,
    MatTooltipModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    UserComponent,
    BankAccountComponent,
    CryptoAccountComponent,
    BankComponent,
    DepositFiatComponent,
    WithdrawFiatComponent,
    TradeFiatComponent,
    TransferCryptoComponent,
    TradeCryptoComponent
  ],
  entryComponents: [
    DepositFiatComponent,
    WithdrawFiatComponent,
    TradeFiatComponent,
    TradeCryptoComponent,
    TransferCryptoComponent
  ]
})
export class UserModule { }
