import { Component, OnInit } from '@angular/core';
import { LandmarkWithPhotos } from 'app/models/landmark-with-photos';
import { HttpService } from 'app/services/http.service';
import { Observable, of, Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { LandmarkWithPhotosAndDescription } from '../../models/landmark-with-photos-and-description';
import { switchMap } from 'rxjs/operators';
import { LandmarkWithDescription } from '../../models/landmark-with-description';
import { NotificationService } from 'app/services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private httpService: HttpService,
        private notificationService: NotificationService,

    ) {
        this.subscribeToEditFormSubject();
    }

    focus: any;

    editFormSubject = new Subject();

    landmarkSelectionForm = new FormGroup({
        landmarkId: new FormControl(null),
    })

    allLandmarks$: Observable<LandmarkWithPhotos[]>;
    activeLandmarkId: string = null;

    landmarkEditForm = new FormGroup({
        title: new FormControl(''),
        longtitude: new FormControl(null),
        latitude: new FormControl(null),
        url: new FormControl(''),
        shortInfo: new FormControl(''),
        description: new FormControl(''),
        objectId: new FormControl(''),
    })

    editedLandmark: LandmarkWithDescription =
        {
            'title': '',
            'location': [],
            'url': '',
            'short_info': '',
            'description': '',
            'objectId': '',
        }

    ngOnInit() {
        this.onDropdownChanges();

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
            setTimeout(() => {
                this.landmarkSelectionForm.get('landmarkId').setValue(landmarkId)
            }, 0);
        }
    }

    onDropdownChanges(): void {
        this.landmarkSelectionForm.valueChanges.subscribe(value => {
            this.landmarkTrigger(value.landmarkId)
        });
    }

    landmarkTrigger(landmarkId) {
        this.activeLandmarkId = landmarkId;
        if (landmarkId) {
            this.httpService.getLandmarkById(landmarkId).subscribe(
                landmark => {
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
        const activeLandmarkTitle = this.landmarkEditForm.get('title').value;
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
                this.router.navigate([], { queryParams: { id: null }, queryParamsHandling: 'merge' })
                this.activeLandmarkId = null;
            })
    }

}
