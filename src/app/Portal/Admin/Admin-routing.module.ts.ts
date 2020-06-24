import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './Admin.component';
import { NgModule } from '@angular/core';
import { ManageApplicationComponent } from './manage-application/manage-application.component';
import { UsersComponent } from './users/users.component';
import { AvailableCurrenciesComponent } from '../Shared/available-currencies/available-currencies.component';
import { ProfileComponent } from '../Shared/profile/profile.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
  { path: 'manage-application', component: ManageApplicationComponent },
  { path: 'users-management', component: UsersComponent }
    ]
  }
];
// [RoleGuard], data: { expectedRole: 'user'}
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
