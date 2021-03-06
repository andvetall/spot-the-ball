import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Components
import { AdminComponent } from './admin.component';
//Modules
import { ManagementRoutingModule } from './admin-routing.module';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { LoginGuard } from 'src/app/core/guards/login-guard';
import { FormsModule } from '@angular/forms';
import { AdminGuard } from 'src/app/core/guards/admin.guard';
import { GameForm } from './shared/components/game-form/game-form.component';
import { NewUserComponent } from './shared/components/new-user/new-user.component';
import { GameTable } from './shared/components/game-table/game-table.component';
import { MainDashboardComponent } from './components/dashboard/main.dashboard.component';
import { ToCamelCasePipe } from 'src/app/shared/pipes/camel.case.pipe';
import { UserTableComponent } from './shared/components/user-table/user-table.component';
import { UserDataDialogComponent } from './shared/components/user-data/user-data.dialog.component';
import { RequestTableComponent } from './shared/components/request-table/request-table.component';


@NgModule({
  imports: [
    ManagementRoutingModule,
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
  ],
  declarations: [
    AdminComponent,
    MainDashboardComponent,
    GameForm,
    NewUserComponent,
    UserTableComponent,
    GameTable,
    RequestTableComponent,
    UserDataDialogComponent,
    ToCamelCasePipe
  ],
  exports: [
    ToCamelCasePipe
  ],
  providers: [
    LoginGuard, 
    AdminGuard
  ],
  entryComponents: [GameForm, NewUserComponent, UserDataDialogComponent]
})
export class AdminModule { }
