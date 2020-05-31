import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ValidateAccountComponent } from './validate-account/validate-account.component';
import { Page404Component } from './page404/page404.component';
import { PortalModule } from './portal/portal.module';
import { LoginComponent } from './login/LoginComponent';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'portal', loadChildren: () => import(`./portal/portal.module`).then(m => m.PortalModule) },
  { path: 'register', component: RegisterComponent},
  { path: 'setPassword/:token', component: SetPasswordComponent},
  { path: 'validateAccount', component: ValidateAccountComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: '**', component: Page404Component}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
