import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppInterceptor } from './app.interceptor';
import { ToastrModule } from 'ngx-toastr';

// // for HttpClient import:
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
// // for Router import:
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
// // for Core import:
import { LoadingBarModule } from '@ngx-loading-bar/core';

import { CookieService } from 'ngx-cookie-service';

import { AdminGuard } from './shared/guard/admin.guard';

import { AuthService } from './shared/services/auth.service';



import { OverlayModule } from '@angular/cdk/overlay';

// // for Modules import:
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ActivatePasswordComponent } from './auth/activate-password/activate-password.component';
import { ExpiredComponent } from './auth/expired/expired.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ActivatePasswordComponent,
    ExpiredComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    OverlayModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ToastrModule.forRoot(),
//     // for HttpClient use:
    LoadingBarHttpClientModule,
//     // for Router use:
    LoadingBarRouterModule,
//     // for Core use:
    LoadingBarModule
  ],
  providers: [ CookieService, AdminGuard, AuthService, { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
