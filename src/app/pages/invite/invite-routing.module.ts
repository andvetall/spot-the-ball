import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { InviteComponent } from './invite.component';
import { InviteNewComponent } from './componets/invite-new/invite-new.component';
import { LoginGuard } from 'src/app/core/guards/login-guard';

const routes: Routes = [
  {
    path: '',
    component: InviteComponent,
    children: [
      { path: 'invite', component: InviteNewComponent},
    ],
    canActivate: [LoginGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InviteRoutingModule { }

