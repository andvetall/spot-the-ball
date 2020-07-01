import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Components
import { AuthComponent } from './pages/auth/auth.component';
import { ClientComponent } from './pages/client/client.component';
import { RoleGuard } from './core/guards/role-guard';



const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => import('src/app/pages/auth/auth.module').then((a) => a.AuthModule)
  },
  {
    path: 'dashboard',
    component: ClientComponent,
    loadChildren: () => import('src/app/pages/client/client.module').then(({ClientModule}) => ClientModule),
    canActivate: [RoleGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
