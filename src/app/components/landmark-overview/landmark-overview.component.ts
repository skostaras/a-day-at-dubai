import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LandmarkWithPhotosAndDescription } from 'app/models/landmark-with-photos-and-description';
import { HttpService } from 'app/services/http.service';
import { AnnotationConstructorOptionsInterface, MapConstructorOptions, MapKitInitOptions } from 'ngx-apple-maps/lib/declarations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-landmark-overview',
  templateUrl: './landmark-overview.component.html',
  styleUrls: ['./landmark-overview.component.scss']
})

export class LandmarkOverviewComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private router: Router,
    private modalService: NgbModal,
  ) { }

  loggedIn = this.httpService.userValue ? true : false;

  landmarkWithDescription$: Observable<LandmarkWithPhotosAndDescription>;
  landmarkId: string;
  randomImageSource = '';
  randomImageSource2 = '';

  // Map Settings follow
  appleMap: any;

  mapOptions: MapKitInitOptions = {
    JWT: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjQ1S0Q2SzhaVzgifQ.eyJpc3MiOiJXSjM2MzM3NE1ZIiwiaWF0IjoxNjQwMjY1Nzg0LCJleHAiOjE2NzE3NTM2MDB9.IXwpGhGhHI5WFFK5UXvtIXJVjYoPJIKoV4m94Wa9IGmhc4SXvyZs4NPBdEtqbO0hL81drJHXs6cGEEEPsjJzaw' // Json Web token
  }

  mapAnnotationOptions: AnnotationConstructorOptionsInterface = {
    title: ""
  }

  latitude = 0
  longitude = 0

  mapSettings: MapConstructorOptions = {
    center: {
      latitude: 0,
      longitude: 0
    },
    mapType: 'hybrid',
    padding: {
      top: 10,
      right: 10,
      bottom: 0,
      left: 0
    },
    isRotationEnabled: true,
    showsCompass: 'adaptive',
    isScrollEnabled: true,
    showsScale: 'adaptive',
    showsUserLocation: false,
    tracksUserLocation: false,
    showsUserLocationControl: false
  }

  ngOnInit() {
    this.getRandomPhotos();
    this.getLandmarkFromUrl();
  }

  getRandomPhotos() {
    let randomInt = this.getRandomInt(1, 12);
    this.randomImageSource = 'assets/img/dubai' + randomInt + '.jpg';

    let randomInt2;

    do {
      randomInt2 = this.getRandomInt(1, 12);
    }
    while (randomInt2 === randomInt);

    setTimeout(() => {
      this.randomImageSource2 = 'assets/img/dubai' + randomInt2 + '.jpg';
    }, 0);

  }

  getLandmarkFromUrl() {
    this.landmarkId = this.route.snapshot.queryParams['id'];

    if (this.landmarkId) {
      this.httpService.getLandmarkById(this.landmarkId).subscribe(
        landmark => {
          this.landmarkWithDescription$ = of(landmark);

          this.longitude = landmark.location[0];
          this.mapSettings.center.longitude = landmark.location[0];

          this.latitude = landmark.location[1];
          this.mapSettings.center.latitude = landmark.location[1];

          this.mapAnnotationOptions.title = landmark.title;

        }, (error) => {
          this.router.navigateByUrl('/home');
        },
      )
    } else {
      this.router.navigateByUrl('/home');
    }

  }

  onMapLoad(map) {
    this.appleMap = map;
    this.appleMap.zoom = 11;
  }

  openModal(content) {
    this.modalService.open(content);
    setTimeout(() => {
      document.getElementsByClassName('modal-dialog')[0].classList.add('modal-xl');
    }, 0);
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

}
