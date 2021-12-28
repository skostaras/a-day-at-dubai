import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { LandmarkWithPhotos } from '../models/landmark-with-photos';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-components',
    templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {

    constructor(
        private httpService: HttpService
    ) { }

    allLandmarks$: Observable<LandmarkWithPhotos[]>;

    ngOnInit() {
        this.httpService.getAllLandmarks().subscribe(
            landmarks => {
                this.allLandmarks$ = of(landmarks);
            }
        );

    }
}
