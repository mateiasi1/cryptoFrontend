import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedComponent } from './Shared.component';
import { TrasactionsComponent } from './trasactions/trasactions.component';
import { ProfileComponent } from './profile/profile.component';
import { AvailableCurrenciesComponent } from './available-currencies/available-currencies.component';

const routes: Routes = [
  {
    path: '', component: SharedComponent, children: [
  { path: 'available-currencies', component: AvailableCurrenciesComponent },
  { path: 'transactions', component: TrasactionsComponent },
  { path: 'profile', component: ProfileComponent}
    ]
  }
];
// [RoleGuard], data: { expectedRole: 'user'}
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
