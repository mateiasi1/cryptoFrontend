import { BankComponent } from './../bank/bank.component';
import { UserRoutingModule } from './User-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './User.component';
import { MatTableModule, MatExpansionModule, MatFormFieldModule, MatSelectModule, MatPaginatorModule, MatInputModule, MatMenuModule, MatButtonModule, MatDialogModule, MatTabsModule, MatToolbarModule, MatCardModule, MatTooltipModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'src/app/_alert';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TrasactionsComponent } from '../trasactions/trasactions.component';
import { BankAccountComponent } from '../bank-account/bank-account.component';
import { CryptoAccountComponent } from '../crypto-account/crypto-account.component';

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
    AlertModule,
    MatTabsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatCardModule,
    MatTooltipModule,
    ReactiveFormsModule
  ],
  declarations: [
    UserComponent,
    TrasactionsComponent,
    BankAccountComponent,
    CryptoAccountComponent,
    BankComponent
  ]
})
export class UserModule { }
