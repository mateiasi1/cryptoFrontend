import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './Admin.component';
import { BankComponent } from '../bank/bank.component';
import { Page404portalComponent } from '../page404portal/page404portal.component';
import { NgModule } from '@angular/core';
import { AvailableCurrenciesComponent } from '../available-currencies/available-currencies.component';
import { ManageApplicationComponent } from '../manage-application/manage-application.component';
import { UsersComponent } from '../users/users.component';
import { ProfileComponent } from '../profile/profile.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
  { path: 'available-currencies', component: AvailableCurrenciesComponent },
  { path: 'manage-application', component: ManageApplicationComponent },
  { path: 'users-management', component: UsersComponent },
  { path: 'profile', component: ProfileComponent}
    ]
  }
];
// [RoleGuard], data: { expectedRole: 'user'}
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
