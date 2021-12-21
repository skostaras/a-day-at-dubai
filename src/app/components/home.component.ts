import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../services/http.service';
import { Landmark } from '../models/landmark';
import { merge, Observable, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

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

    allLandmarks$: Observable<Landmark[]>;

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

        // this.allLandmarks$ = this.httpService.getAllLandmarks().pipe(switchMap(landmarks => { console.log(landmarks) }));

        // this.allLandmarks$ = this.httpService.getAllLandmarks();

        // let hello = this.httpService.getall();

        merge()
            .pipe(
                startWith({}),
                switchMap(() => {
                    return this.httpService.getAllLandmarks();
                }),
                // map(data => {
                //     if (data === null) {
                //         // this.loadingJokes = false;
                //         return [];
                //     }
                //     this.allLandmarks$ = of(data);
                //     return data;
                // }),
            )
            .subscribe(landmarks => {
                this.allLandmarks$ = of(landmarks);
                console.log(landmarks);

                // this.jokes = data;
                // this.loadingJokes = false;
            }
            );





        // this.getIds().pipe(
        //     switchMap((id: string) => this.getNames(id))
        //   ).subscribe((response) -> {
        //     console.log(response)
        //   })

    }



    ngOnDestroy() {
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('index-page');
    }
}
