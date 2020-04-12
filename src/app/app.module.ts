
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatExpansionModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterUserComponent } from './registerUser/registerUser.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth-service';
import { LoginModule } from 'src/Login/Login.module';
import { AppRoutingModule } from './app-routing.module';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from 'src/Login/Login.component';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import { RoleGuardService } from './role-guard.service';
import {MatMenuModule} from '@angular/material/menu';
import { PortalComponent } from './Portal/Portal.component';
import { DepositComponent } from './Portal/deposit/deposit.component';
import { WithdrawComponent } from './Portal/withdraw/withdraw.component';
import { TradeComponent } from './Portal/trade/trade.component';
import { BankAccountComponent } from './Portal/bank/bankAccount/bankAccount.component';
import { AvailableCurrenciesComponent, AddCurrencyComponent, AddCryptoComponent } from './Portal/availableCurrencies/availableCurrencies.component';
import { BankComponent } from './Portal/bank/bank';
import { ManageApplicationComponent } from './Portal/manage-application/manage-application.component';
import { UsersComponent } from './Portal/users/users.component';
import { ValidateAccountComponent } from './Portal/validateAccount/validateAccount.component';
import { CryptoAccountComponent } from './Portal/cryptoAccount/cryptoAccount.component';
import { BankAccountService } from './Portal/bank/bankAccount/bankAccount.service';
import { CryptoAccountService } from './Portal/cryptoAccount/cryptoAccount.service';
import { TradeService } from './Portal/trade/trade.service';
import { SetPasswordModule } from 'src/SetPassword/SetPassword.module';
import { IconSpriteModule } from 'ng-svg-icon-sprite';
import { SvgIconComponent } from './svg-icon.component';
import { environment } from 'src/environments/environment';
import { TokenInterceptor } from './TokenInterceptor';

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
      ValidateAccountComponent,
      CryptoAccountComponent,
      PortalComponent,
      AddCurrencyComponent,
      AddCryptoComponent,
      SvgIconComponent
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
      MatCardModule,
      MatMenuModule,
      SetPasswordModule,
      MatButtonModule,
      MatIconModule,
      MatTooltipModule,
      IconSpriteModule.forRoot({ path: environment.spritePath })
   ],
   providers: [
      BankAccountService,
      CryptoAccountService,
      TradeService,
      ManageApplicationComponent,
      AuthService,
      AuthGuardService,
      LoginComponent,
      RoleGuardService,
      { provide: HTTP_INTERCEPTORS,
         useClass: TokenInterceptor,
         multi: true
      }
   ],
   bootstrap: [
      AppComponent,
      SvgIconComponent
   ],
   entryComponents: [AddCurrencyComponent, AddCryptoComponent]
})
export class AppModule { }
