import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/modules/material/material.module';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
  ],
})
export class AuthModule { }
