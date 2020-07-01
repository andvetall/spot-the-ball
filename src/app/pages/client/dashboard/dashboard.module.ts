//Vendors
import { LoginGuard } from 'src/app/core/guards/login-guard';
import { RoleGuard } from 'src/app/core/guards/role-guard';
//Components
import { ResultDialogComponent } from '../shared/components/result-dialog/result-dialog.component';
import { GameComponent } from './components/game/game.component';
import { DashboardComponent } from './dashboard.component';
import { GameWrapperComponent } from './components/game-wrapper/game-wrapper.component';
import { ResultComponent } from './components/result/result.component';
//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/modules/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [
    GameComponent,
    DashboardComponent,
    ResultDialogComponent,

    GameWrapperComponent,
    ResultComponent
  ],
  providers: [LoginGuard, RoleGuard ],
  entryComponents: [ResultDialogComponent],
})
export class DashboardModule { }