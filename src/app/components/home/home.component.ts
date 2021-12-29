import { Component, OnInit } from '@angular/core';
import { LandmarkWithPhotos } from 'app/models/landmark-with-photos';
import { HttpService } from 'app/services/http.service';
import * as Rellax from 'rellax';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-components',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    constructor(
        private httpService: HttpService
    ) { }

    allLandmarks$: Observable<LandmarkWithPhotos[]>;

    ngOnInit() {
        var rellax = new Rellax('.rellax');

        this.httpService.getAllLandmarks().subscribe(
            landmarks => {
                this.allLandmarks$ = of(landmarks);
            }
        );

    }
}
