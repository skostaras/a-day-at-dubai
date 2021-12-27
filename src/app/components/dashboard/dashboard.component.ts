import { Component, OnInit } from '@angular/core';
import { LandmarkWithPhotos } from 'app/models/landmark-with-photos';
import { HttpService } from 'app/services/http.service';
import { merge, Observable, of, Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LandmarkWithPhotosAndDescription } from '../../models/landmark-with-photos-and-description';
import { map, startWith, switchMap } from 'rxjs/operators';
import { LandmarkWithDescription } from '../../models/landmark-with-description';
import { NotificationService } from 'app/services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';

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
        landmarkId: new FormControl(null),
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
        private route: ActivatedRoute,
        private router: Router,
        private httpService: HttpService,
        private notificationService: NotificationService,

    ) {
        this.subscribeToEditFormSubject();

    }

    selectedLandmark: any;

    landmarkTrigger(landmarkId) {

        console.log("landmarkTrigger");

        console.log(landmarkId);


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
            this.router.navigate([], { queryParams: { id: landmarkId }, queryParamsHandling: 'merge' })
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
            this.router.navigate([], { queryParams: { id: null }, queryParamsHandling: 'merge' })
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

        this.onDropdownChanges();

        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');

        this.httpService.getAllLandmarks().subscribe(
            landmarks => {
                this.allLandmarks$ = of(landmarks);
                this.lookForLandmarkIdUrlParams();
            }
        );


    }

    lookForLandmarkIdUrlParams() {
        let landmarkId = this.route.snapshot.queryParams['id'];

        if (landmarkId) {

            // LandmarkWithPhotosAndDescription
            this.httpService.getLandmarkById(landmarkId).subscribe(
                landmark => {
                    console.log(landmark);

                    let landmarkAdjusted: LandmarkWithPhotos = {
                        title: landmark.title,
                        location: landmark.location,
                        url: landmark.url,
                        short_info: landmark.short_info,
                        objectId: landmark.objectId,
                        createdAt: landmark.createdAt,
                        updatedAt: landmark.updatedAt,
                        photo: {
                            __type: landmark.photo.__type,
                            name: landmark.photo.name,
                            url: landmark.photo.url,
                        },
                        photo_thumb: {
                            __type: landmark.photo_thumb.__type,
                            name: landmark.photo_thumb.name,
                            url: landmark.photo_thumb.url,
                        }
                    }

                    this.landmarkSelectionForm.get('landmarkId').setValue(
                        // LandmarkWithPhotos
                        landmarkId
                    )

                    console.log(landmarkAdjusted);

                }
            )


            // this.landmarkTrigger(landmarkId);

        }
    }


    onDropdownChanges(): void {
        this.landmarkSelectionForm.valueChanges.subscribe(value => {
            console.log(value);

            this.landmarkTrigger(value.landmarkId)
        });
    }

    ngOnDestroy() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }

}
