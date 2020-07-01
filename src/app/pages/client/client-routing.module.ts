import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Components
import { ClientComponent } from './client.component';
import { RoleGuard } from 'src/app/core/guards/role-guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResultComponent } from './dashboard/components/result/result.component';
import { GameComponent } from './dashboard/components/game/game.component';
const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      { path: '', component: DashboardComponent, canActivate:[RoleGuard]},
      {path: 'game', component: GameComponent},
      { path: 'result', component: ResultComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
