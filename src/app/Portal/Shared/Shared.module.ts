import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './Shared.component';
import { SharedRoutingModule } from './Shared-routing.module';
import { MatTableModule, MatExpansionModule, MatFormFieldModule, MatSelectModule, MatPaginatorModule, MatInputModule, MatMenuModule, MatButtonModule, MatDialogModule, MatTabsModule, MatToolbarModule, MatCardModule, MatTooltipModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'src/app/_alert';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AvailableCurrenciesComponent } from './available-currencies/available-currencies.component';
import { ProfileComponent } from './profile/profile.component';
import { TrasactionsComponent } from './trasactions/trasactions.component';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule,
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
    SharedComponent,
    AvailableCurrenciesComponent,
    ProfileComponent,
    TrasactionsComponent
  ]
})
export class SharedModule { }
