import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../services/http.service';
import { LandmarkWithPhotos } from '../models/landmark-with-photos';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-components',
    templateUrl: './home.component.html',
    styles: [`
    ngb-progressbar {
        margin-top: 5rem;
    }
    `]
})

export class HomeComponent implements OnInit, OnDestroy {

    constructor(config: NgbAccordionConfig,
        private httpService: HttpService
    ) {
        config.closeOthers = true;
        config.type = 'info';
    }

    page = 4;
    page1 = 5;
    page2 = 3;
    focus;
    focus1;
    focus2;

    allLandmarks$: Observable<LandmarkWithPhotos[]>;

    model: NgbDateStruct;

    public isCollapsed = true;
    public isCollapsed1 = true;
    public isCollapsed2 = true;

    state_icon_primary = true;

    isDisabled(date: NgbDateStruct, current: { month: number }) {
        return date.month !== current.month;
    }

    ngOnInit() {
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('index-page');

        this.httpService.getAllLandmarks().subscribe(
            landmarks => {
                this.allLandmarks$ = of(landmarks);
            }
        );

    }

    ngOnDestroy() {
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('index-page');
    }
}
