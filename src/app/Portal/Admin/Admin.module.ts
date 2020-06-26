import { SharedModule } from './../Shared/Shared.module';
import { AdminRoutingModule } from './Admin-routing.module.ts';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './Admin.component';
// tslint:disable-next-line: max-line-length
import { MatTableModule, MatExpansionModule, MatFormFieldModule, MatSelectModule, MatPaginatorModule, MatInputModule, MatMenuModule, MatButtonModule, MatDialogModule, MatTabsModule, MatToolbarModule, MatCardModule, MatTooltipModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ManageApplicationComponent } from './manage-application/manage-application.component';
import { UsersComponent } from './users/users.component';
import { AvailableCurrenciesComponent } from '../Shared/available-currencies/available-currencies.component';

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
    MatTabsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatCardModule,
    MatTooltipModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    AdminComponent,
    ManageApplicationComponent,
    UsersComponent
  ]
})
export class AdminModule { }
