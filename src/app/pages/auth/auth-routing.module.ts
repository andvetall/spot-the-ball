import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoginGuard } from 'src/app/core/guards/login-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'invite',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {path : "login", component: LoginComponent},
    ],
    canActivate: [LoginGuard]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {path : "reset-password", component: ResetPasswordComponent},
    ],
    canActivate: [LoginGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

