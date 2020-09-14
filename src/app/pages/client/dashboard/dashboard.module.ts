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
import { FriendsComponent } from './components/friends/friends.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { PrizesComponent } from './components/prizes/prizes.component';
import { ResultDialogQuestionComponent } from '../shared/components/result-dialog-question/result-dialog-question.component';
import { RateModalComponent } from '../shared/components/rate-modal/rate-modal.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    GameComponent,
    DashboardComponent,
    ResultDialogComponent,
    RateModalComponent,
    ResultDialogQuestionComponent,
    FriendsComponent,
    PrizesComponent,
    PersonalInfoComponent,
    GameWrapperComponent,
    ResultComponent
  ],
  providers: [LoginGuard, RoleGuard ],
  entryComponents: [ResultDialogComponent, RateModalComponent, ResultDialogQuestionComponent],
})
export class DashboardModule { }