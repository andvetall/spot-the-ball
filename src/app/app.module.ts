import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { MatSidenavModule } from '@angular/material/sidenav';
//Modules
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './modules/material/material.module';
import { AuthModule } from './pages/auth/auth.module';
import { ClientModule } from './pages/client/client.module';
import { AdminModule } from './pages/admin/admin.module';
//Components
import { AppComponent } from './app.component';
import { LoginGuard } from './core/guards/login-guard';
import { HttpErrorInterceptor } from './core/interceptors/http.interceptor';
import { ErrorService } from './core/error-handler/error.handler';
import { InviteModule } from './pages/invite/invite-user.module';
import { FavotiteTeamComponent } from './shared/components/favotite-team/favotite-team.component';
import { HowToPlayComponent } from './shared/components/how-to-play/how-to-play.component';
import { InfoPopUpComponent } from './shared/components/info-pop-up/info-pop-up.component';

const COMPONENTS = [
];

@NgModule({
  declarations: [
    AppComponent,
    FavotiteTeamComponent,
    HowToPlayComponent,
    InfoPopUpComponent,
    COMPONENTS
  ],
  imports: [
    AuthModule,
    InviteModule,
    ClientModule,
    AdminModule,
    AppRoutingModule,
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    ToastContainerModule,
    MatSidenavModule,
  ],
  providers: [
    LoginGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler, 
      useClass: ErrorService
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [FavotiteTeamComponent, HowToPlayComponent, InfoPopUpComponent]
})
export class AppModule { }
