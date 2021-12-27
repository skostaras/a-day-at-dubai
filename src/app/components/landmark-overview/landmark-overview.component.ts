import { Component, Inject, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LandmarkWithPhotos } from '../../models/landmark-with-photos';
import { Observable, of } from 'rxjs';
import { LandmarkWithPhotosAndDescription } from 'app/models/landmark-with-photos-and-description';
import { HttpService } from 'app/services/http.service';
import { AnnotationConstructorOptionsInterface, MapConstructorOptions, MapKitInitOptions } from 'ngx-apple-maps/lib/declarations';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-landmark-overview',
  templateUrl: './landmark-overview.component.html',
  styleUrls: ['./landmark-overview.component.scss']
})

export class LandmarkOverviewComponent implements OnInit {
  focus;
  focus1;

  map
  landmarkWithDescription$: Observable<LandmarkWithPhotosAndDescription>;

  landmarkId: string;

  options: MapKitInitOptions = {
    language: 'en', // default browser language
    callback: (data, error) => {
      //   // return map event
    },
    JWT: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjQ1S0Q2SzhaVzgifQ.eyJpc3MiOiJXSjM2MzM3NE1ZIiwiaWF0IjoxNjQwMjY1Nzg0LCJleHAiOjE2NzE3NTM2MDB9.IXwpGhGhHI5WFFK5UXvtIXJVjYoPJIKoV4m94Wa9IGmhc4SXvyZs4NPBdEtqbO0hL81drJHXs6cGEEEPsjJzaw' // Json Web token
  }
  annotationOptions: AnnotationConstructorOptionsInterface = {
    title: ""
  }
  latitude = 0
  longitude = 0

  settings: MapConstructorOptions = {
    center: { // center of the map
      latitude: 0,
      longitude: 0
    },
    mapType: 'hybrid', // 'mutedStandard' | 'standard' | 'satellite' | 'hybrid'
    padding: { // map padding
      top: 10,
      right: 10,
      bottom: 0,
      left: 0
    },
    isRotationEnabled: true,
    showsCompass: 'adaptive', // 'adaptive' (showing always and on the touch screen devices hides if rotationElabled: false and rotation: 0) | 'hidden' | 'visible'
    isScrollEnabled: true, // A Boolean value that determines whether the user may scroll the map with a pointing device or with gestures on a touchscreen.
    showsScale: 'adaptive', // 'adaptive' | 'hidden' | 'visible' https://developer.apple.com/documentation/mapkitjs/mapkit/map/2973941-showsscale?changes=latest_minor
    showsUserLocation: false,
    tracksUserLocation: false,
    showsUserLocationControl: false
  }

  randomImageSource = '';

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private router: Router,
    private modalService: NgbModal,
  ) { }

  closeResult: string;


  open(content, type, modalDimension) {

    if (modalDimension === 'sm' && type === 'modal_mini') {
      this.modalService.open(content, { windowClass: 'modal-mini modal-primary', size: 'sm' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else if (modalDimension == undefined && type === 'Login') {
      this.modalService.open(content, { windowClass: 'modal-login modal-primary' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {
      document.getElementsByClassName('modal-dialog')[0].classList.add('modal-xl');
      this.modalService.open(content).result.then((result) => {

        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onLoaded(e) {
    this.map = e;
    this.map.zoom = 11;
    this.map.addEventListener('select', (event) => {
    });

  }

  ngOnInit() {
    let randomInt = this.getRandomInt(1, 6);
    this.randomImageSource = 'assets/img/dubai' + randomInt + '.jpg';

    let landmarkId = this.route.snapshot.queryParams['id'];

    if (landmarkId) {
      this.httpService.getLandmarkById(landmarkId).subscribe(
        landmark => {
          this.landmarkWithDescription$ = of(landmark);

          this.longitude = landmark.location[0];
          this.settings.center.longitude = landmark.location[0];

          this.latitude = landmark.location[1];
          this.settings.center.latitude = landmark.location[1];

          this.annotationOptions.title = landmark.title;

          console.log(landmark);

          setTimeout(() => {
            console.log(this.map.getAnnotations());
          }, 2000);

        }, (error) => {
          this.router.navigateByUrl('/home');
        },
      )
    } else {
      this.router.navigateByUrl('/home');
    }


    var body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }
}
