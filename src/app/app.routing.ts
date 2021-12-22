import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home.component';
import { LandmarkOverviewComponent } from './components/landmark-overview/landmark-overview.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { AllLandmarksComponent } from './components/all-landmarks/all-landmarks.component';
import { AuthGuard } from './services/authGuard';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'nucleoicons', component: NucleoiconsComponent },
    // { path: 'landmark', component: LandmarkOverviewComponent, data: { landmark: null } },
    { path: 'landmark', component: LandmarkOverviewComponent },
    { path: 'examples/profile', component: AllLandmarksComponent },
    { path: '**', redirectTo: '' }
    // { path: '/adminDummy', component: FormEditComponentDummy , canActivate: [AuthGuard]}
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
})
export class AppRoutingModule { }
