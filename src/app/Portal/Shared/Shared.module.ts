import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './Shared.component';
import { SharedRoutingModule } from './Shared-routing.module';
import { MatTableModule, MatExpansionModule, MatFormFieldModule, MatSelectModule, MatPaginatorModule, MatInputModule, MatMenuModule, MatButtonModule, MatDialogModule, MatTabsModule, MatToolbarModule, MatCardModule, MatTooltipModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AvailableCurrenciesComponent, AddCurrencyComponent, AddCryptoComponent } from './available-currencies/available-currencies.component';
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
    TrasactionsComponent,
    AddCurrencyComponent,
    AddCryptoComponent
  ],
  entryComponents: [
    AddCurrencyComponent,
    AddCryptoComponent
  ]
})
export class SharedModule { }
