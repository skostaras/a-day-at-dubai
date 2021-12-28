import { Component, OnInit } from '@angular/core';
import { LandmarkWithPhotos } from 'app/models/landmark-with-photos';
import { HttpService } from 'app/services/http.service';
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
        this.httpService.getAllLandmarks().subscribe(
            landmarks => {
                this.allLandmarks$ = of(landmarks);
            }
        );

    }
}
