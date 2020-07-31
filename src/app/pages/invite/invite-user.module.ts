import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { InviteRoutingModule } from './invite-routing.module';
import { InviteComponent } from './invite.component';
import { InviteNewComponent } from './componets/invite-new/invite-new.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    InviteRoutingModule
  ],
  declarations: [
    InviteComponent,
    InviteNewComponent
  ],
})
export class InviteModule { }
