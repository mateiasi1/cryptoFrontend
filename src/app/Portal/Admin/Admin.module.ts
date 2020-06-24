import { BankComponent } from './../bank/bank.component';
import { AvailableCurrenciesComponent } from './../available-currencies/available-currencies.component';
import { AdminRoutingModule } from './Admin-routing.module.ts';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './Admin.component';
import { MatTableModule, MatExpansionModule, MatFormFieldModule, MatSelectModule, MatPaginatorModule, MatInputModule, MatMenuModule, MatButtonModule, MatDialogModule, MatTabsModule, MatToolbarModule, MatCardModule, MatTooltipModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'src/app/_alert';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ManageApplicationComponent } from '../manage-application/manage-application.component';
import { UsersComponent } from '../users/users.component';
import { ProfileComponent } from '../profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
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
    AdminComponent,
    AvailableCurrenciesComponent,
    ManageApplicationComponent,
    UsersComponent,
    ProfileComponent
  ]
})
export class AdminModule { }
