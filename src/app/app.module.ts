import { HttpClientWServiceService } from './services/HttpClientWService.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ValidateAccountComponent } from './validate-account/validate-account.component';
import { Page404Component } from './page404/page404.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// tslint:disable-next-line:max-line-length
import { MatDialogModule, MatFormFieldModule, MatInputModule, MatExpansionModule, MatCheckboxModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatMenuModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from './login/LoginComponent';
import { AuthService } from './services/auth-service';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginService } from './services/login.service';
import { RoleGuardService } from './services/role-guad.service';
import { TokenInterceptor } from './components/token-nterceptor';
import { BankAccountService } from './services/bankAccount.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ManageApplicationComponent } from './portal/Admin/manage-application/manage-application.component';
import { ToasterContainerComponent } from './_alert/toaster-container.component';
import { ToasterComponent } from './_alert/toaster.component';
import { TokenInterceptorServiceService } from './services/TokenInterceptorService.service';

const modules = [
  MatCardModule,
  FormsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatExpansionModule,
  HttpClientModule,
  MatCheckboxModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatMenuModule,
  MatIconModule,
  MatTooltipModule
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SetPasswordComponent,
    ValidateAccountComponent,
    Page404Component,
    ToasterContainerComponent,
    ToasterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ...modules,
    FlexLayoutModule
  ],
  exports: [...modules],
  providers: [
    ManageApplicationComponent,
    AuthService,
    AuthGuardService,
    LoginService,
    RoleGuardService,
    HttpClientWServiceService,
    BankAccountService,
    { provide: HTTP_INTERCEPTORS,
       useClass: TokenInterceptorServiceService,
       multi: true
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
