import { UserModule } from './User/User.module';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { ManageApplicationComponent } from './manage-application/manage-application.component';
import { AdminModule } from './Admin/Admin.module';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';
// tslint:disable-next-line:max-line-length
import { Page404portalComponent } from './page404portal/page404portal.component';
// tslint:disable-next-line:max-line-length
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
// tslint:disable-next-line:max-line-length
import { MatPaginatorModule, MatInputModule, MatMenuModule, MatSnackBar, MatButtonModule, MatDialogModule, MatTabsModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { AuthService } from '../services/auth-service';
import { AuthGuardService } from '../services/auth-guard.service';
import { LoginService } from '../services/login.service';
import { RoleGuardService } from '../services/role-guad.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../components/token-nterceptor';
import { BankAccountService } from '../services/bankAccount.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { CryptoAccountService } from '../services/cryptoAccount.service';
import { LoginComponent } from '../login/LoginComponent';
import { AlertModule } from '../_alert';
import { FlexLayoutModule } from "@angular/flex-layout";
import { BankComponent } from './bank/bank.component';
import { BankAccountComponent, DepositFiatComponent, WithdrawFiatComponent, TradeFiatComponent } from './bank-account/bank-account.component';
import { CryptoAccountComponent, TransferCryptoComponent } from './crypto-account/crypto-account.component';
import { TrasactionsComponent } from './trasactions/trasactions.component';

@NgModule({

exports: [
  MatTableModule
],
  declarations: [
    PortalComponent,
    Page404portalComponent,
    DepositFiatComponent,
    WithdrawFiatComponent,
    TradeFiatComponent,
    TransferCryptoComponent,
    Page404portalComponent
  ],
  imports: [
    CommonModule,
    PortalRoutingModule,
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
    ReactiveFormsModule,
    AdminModule,
    UserModule
  ],
  providers: [
    LoginComponent,
    LoginService,
    RoleGuardService,
    BankAccountService,
    JwtHelperService,
    CryptoAccountService,
    MatSnackBar,
    CryptoAccountComponent,
    { provide: HTTP_INTERCEPTORS,
       useClass: TokenInterceptor,
       multi: true
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ]
})
export class PortalModule { }
