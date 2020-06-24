import { SharedModule } from './Shared/Shared.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404portalComponent } from './page404portal/page404portal.component';
import { PortalComponent } from './portal.component';

const routes: Routes = [
  {
    path: '', component: PortalComponent, children: [
  { path: 'admin', loadChildren: () => import(`./Admin/Admin.module`).then(m => m.AdminModule) },
  { path: 'user', loadChildren: () => import(`./User/User.module`).then(m => m.UserModule) },
  { path: '', redirectTo: 'bank-account', pathMatch: 'full'},
  { path: '**', component: Page404portalComponent }
    ]
  }
];
// [RoleGuard], data: { expectedRole: 'user'}
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
