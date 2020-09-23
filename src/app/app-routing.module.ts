import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Components
import { AuthComponent } from './pages/auth/auth.component';
import { ClientComponent } from './pages/client/client.component';
import { RoleGuard } from './core/guards/role-guard';
import { InviteComponent } from './pages/invite/invite.component';



const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => import('src/app/pages/auth/auth.module').then(a => a.AuthModule)
  },
  {
    path: 'dashboard',
    component: ClientComponent,
    loadChildren: () => import('src/app/pages/client/client.module').then(a => a.ClientModule),
    canActivate: [RoleGuard]
  },
  {
    path: 'inv',
    component: InviteComponent,
    loadChildren: () => import('src/app/pages/invite/invite-user.module').then(a => a.InviteModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
