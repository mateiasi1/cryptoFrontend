import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {  DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { BankAccountComponent } from './bankAccount/bankAccount.component';
import { BankAccountService } from './bankAccount/bankAccount.service';
import { TradeComponent } from './trade/trade.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatExpansionModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { TradeService } from './trade/trade.service';
import { HttpClientModule } from '@angular/common/http';
import { AvailableCurrenciesComponent } from './availableCurrencies/availableCurrencies.component';
import { BankComponent } from './bank/bank';
import { ManageApplicationComponent } from './manage-application/manage-application.component';
import { RegisterUserComponent } from './registerUser/registerUser.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth-service';
import { LoginModule } from 'src/Login/Login.module';
import { AppRoutingModule } from './app-routing.module.module';
import { UsersComponent } from './users/users.component';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from 'src/Login/Login.component';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import { ValidateAccountComponent } from './validateAccount/validateAccount.component';

@NgModule({
   declarations: [
      AppComponent,
      DepositComponent,
      WithdrawComponent,
      BankAccountComponent,
      TradeComponent,
      AvailableCurrenciesComponent,
      BankComponent,
      ManageApplicationComponent,
      RegisterUserComponent,
      UsersComponent,
      ValidateAccountComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      MatDialogModule,
      BrowserAnimationsModule,
      MatFormFieldModule,
      MatSelectModule,
      MatInputModule,
      MatExpansionModule,
      HttpClientModule,
      MatCheckboxModule,
      LoginModule,
      AppRoutingModule,
      MatButtonModule,
      MatTableModule,
      MatPaginatorModule,
      MatCardModule
   ],
   providers: [
      BankAccountService,
      TradeService,
      ManageApplicationComponent,
      AuthService,
      AuthGuard,
      LoginComponent
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
