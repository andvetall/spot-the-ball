import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Components
import { AdminComponent } from './admin.component';
//Modules
import { ManagementRoutingModule } from './admin-routing.module';
import { MatCardModule } from '@angular/material/card';
import { NgxGalleryModule } from 'ngx-gallery';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { LoginGuard } from 'src/app/core/guards/login-guard';
import { FormsModule } from '@angular/forms';
import { AdminGuard } from 'src/app/core/guards/admin.guard';
import { GameForm } from './shared/components/game-form/game-form.component';
import { NewUserComponent } from './shared/components/new-user/new-user.component';
import { GameTable } from './shared/components/game-table/game-table.component';
import { MainDashboardComponent } from './components/dashboard/main.dashboard.component';


@NgModule({
  imports: [
    ManagementRoutingModule,
    CommonModule,
    MatCardModule,
    NgxGalleryModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
  ],
  declarations: [
    AdminComponent,
    MainDashboardComponent,
    GameForm,
    NewUserComponent,
    GameTable
  ],
  providers: [
    LoginGuard, 
    AdminGuard
  ],
  entryComponents: [GameForm]
})
export class AdminModule { }
