import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Components
import { ClientComponent } from './client.component';
import { RoleGuard } from 'src/app/core/guards/role-guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResultComponent } from './dashboard/components/result/result.component';
import { GameComponent } from './dashboard/components/game/game.component';
import { FriendsComponent } from './dashboard/components/friends/friends.component';
import { PersonalInfoComponent } from './dashboard/components/personal-info/personal-info.component';
const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate:[RoleGuard]},
      { path: 'game', component: GameComponent, canActivate:[RoleGuard]},
      { path: 'result', component: ResultComponent, canActivate:[RoleGuard]},
      { path: 'friends', component: FriendsComponent, canActivate:[RoleGuard]},
      { path: 'personal-info', component: PersonalInfoComponent, canActivate:[RoleGuard]},
      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
