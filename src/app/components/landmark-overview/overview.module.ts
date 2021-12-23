import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppleMapsModule } from 'ngx-apple-maps';
import { LandmarkOverviewComponent } from './landmark-overview.component';

@NgModule({
    declarations: [
        LandmarkOverviewComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NouisliderModule,
        RouterModule,
        JwBootstrapSwitchNg2Module,
        HttpClientModule,
        AppleMapsModule,
    ],
    exports: [LandmarkOverviewComponent]
})
export class OverviewModule { }
