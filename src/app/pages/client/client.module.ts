//Vendors
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Components
import { ClientComponent } from './client.component';
import { ResultDialogComponent } from './shared/components/result-dialog/result-dialog.component';
import { MenuItemComponent } from 'src/app/shared/components/menu-item/menu.item.component';
//Modules
import { ManagementRoutingModule } from './client-routing.module';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { LoginGuard } from 'src/app/core/guards/login-guard';
import { FormsModule } from '@angular/forms';
import { RoleGuard } from 'src/app/core/guards/role-guard';
import { MatTabsModule } from '@angular/material/tabs';
import { DashboardModule } from './dashboard/dashboard.module';
import { ResultDialogQuestionComponent } from './shared/components/result-dialog-question/result-dialog-question.component';
import { RateModalComponent } from './shared/components/rate-modal/rate-modal.component';


@NgModule({
  imports: [
    ManagementRoutingModule,
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    MatTabsModule,
    DashboardModule
  ],
  declarations: [
    ClientComponent,
    MenuItemComponent
  ],
  providers: [LoginGuard, RoleGuard],
  entryComponents: [ResultDialogComponent, ResultDialogQuestionComponent, RateModalComponent]
})
export class ClientModule { }
