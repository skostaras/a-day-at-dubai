import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { ErrorInterceptor } from './services/error.interceptor';
import { NotificationComponent } from './components/notification/notification.component';
import { AppleMapsModule } from 'ngx-apple-maps';
import { CommonModule } from '@angular/common';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { LandmarkOverviewComponent } from './components/landmark-overview/landmark-overview.component';
import { HomeComponent } from './components/home.component';
import { LoginComponent } from './shared/login/login.component';
import { AllLandmarksComponent } from './components/all-landmarks/all-landmarks.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UrlShortenPipe } from './shared/url-shorten-pipe';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        NotificationComponent,
        LandmarkOverviewComponent,
        HomeComponent,
        LoginComponent,
        AllLandmarksComponent,
        FooterComponent,
        UrlShortenPipe,
        DashboardComponent,
    ],

    imports: [
        BrowserAnimationsModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AppRoutingModule,
        HttpClientModule,
        AppleMapsModule,
        CommonModule,
        NouisliderModule,
        JwBootstrapSwitchNg2Module,
    ],

    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
