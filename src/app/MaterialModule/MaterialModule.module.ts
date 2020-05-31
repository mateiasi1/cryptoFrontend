import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModuleComponent } from './MaterialModule.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// tslint:disable-next-line:max-line-length
import { MatDialogModule, MatFormFieldModule, MatInputModule, MatExpansionModule, MatCheckboxModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatMenuModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { PortalRoutingModule } from '../Portal/Portal-routing.module';
import { MatCardModule } from '@angular/material/card';

const materialModules = [
  CommonModule,
  BrowserModule,
  MatCardModule,
  FormsModule,
  MatDialogModule,
  BrowserAnimationsModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatExpansionModule,
  HttpClientModule,
  MatCheckboxModule,
  AppRoutingModule,
  PortalRoutingModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatTooltipModule,
  ReactiveFormsModule
];

@NgModule({
  imports: [
    ...materialModules
  ],
  exports: [
    ...materialModules
  ],
})

export class MaterialModuleModule { }
