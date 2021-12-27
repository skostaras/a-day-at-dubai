import { Component, OnInit } from '@angular/core';
import { LandmarkWithPhotos } from 'app/models/landmark-with-photos';
import { HttpService } from 'app/services/http.service';
import { merge, Observable, of, Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LandmarkWithPhotosAndDescription } from '../../models/landmark-with-photos-and-description';
import { map, startWith, switchMap } from 'rxjs/operators';
import { LandmarkWithDescription } from '../../models/landmark-with-description';
import { NotificationService } from 'app/services/notification.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    data: Date = new Date();
    focus;
    focus1;

    private editFormSubject = new Subject();

    allLandmarks$: Observable<LandmarkWithPhotos[]>;
    activeLandmark$: Observable<LandmarkWithPhotosAndDescription>;
    activeLandmarkId: string = null;
    editedLandmark: LandmarkWithDescription =
        {
            'title': '',
            'location': [],
            'url': '',
            'short_info': '',
            'description': '',
            'objectId': '',
        }


    landmarkSelectionForm = new FormGroup({
        landmark: new FormControl(null),
    })

    landmarkEditForm = new FormGroup({
        title: new FormControl(''),
        longtitude: new FormControl(null),
        latitude: new FormControl(null),
        url: new FormControl(''),
        shortInfo: new FormControl(''),
        description: new FormControl(''),
        objectId: new FormControl(''),
    })

    constructor(
        private httpService: HttpService,
        private notificationService: NotificationService,
    ) {
        this.subscribeToEditFormSubject();

    }

    selectedLandmark: any;

    landmarkTrigger(landmarkId) {

        this.activeLandmarkId = landmarkId;
        if (landmarkId) {
            this.httpService.getLandmarkById(landmarkId).subscribe(
                landmark => {
                    this.activeLandmark$ = of(landmark);

                    this.landmarkEditForm.setValue({
                        title: landmark.title,
                        longtitude: landmark.location[0],
                        latitude: landmark.location[1],
                        url: landmark.url,
                        shortInfo: landmark.short_info,
                        description: landmark.description,
                        objectId: landmarkId,
                    })
                }
            )
        }

    }

    submitEdit() {
        let activeLandmarkTitle = this.landmarkEditForm.get('title').value;
        if (confirm("Are you sure you want to update " + activeLandmarkTitle + "?")) {
            this.editedLandmark.title = activeLandmarkTitle;
            this.editedLandmark.location[0] = this.landmarkEditForm.get('longtitude').value;
            this.editedLandmark.location[1] = this.landmarkEditForm.get('latitude').value;
            this.editedLandmark.url = this.landmarkEditForm.get('url').value;
            this.editedLandmark.short_info = this.landmarkEditForm.get('shortInfo').value;
            this.editedLandmark.description = this.landmarkEditForm.get('description').value;
            this.editedLandmark.objectId = this.landmarkEditForm.get('objectId').value;

            this.editFormSubject.next(this.editedLandmark);
            this.subscribeToEditFormSubject();
        }
    }

    subscribeToEditFormSubject() {
        this.editFormSubject
            .asObservable()
            .pipe(
                switchMap((editedLandmark: LandmarkWithDescription) => this.httpService.editLandmarkRequest(this.activeLandmarkId, editedLandmark)),
            )
            .subscribe((response: any) => {
                this.notificationService.successNotification(response.message);
                this.landmarkEditForm.reset();
                this.landmarkSelectionForm.reset();
                this.activeLandmarkId = null;
            })
    }

    ngOnInit() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');

        this.httpService.getAllLandmarks().subscribe(
            landmarks => {
                this.allLandmarks$ = of(landmarks);
            }
        );
    }
    ngOnDestroy() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }

}
