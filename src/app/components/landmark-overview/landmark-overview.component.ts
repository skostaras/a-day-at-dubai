import { Component, Inject, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Landmark } from '../../models/landmark';
import { Observable, of } from 'rxjs';
import { map, switchMap, take, tap, catchError } from 'rxjs/operators';
import { LandmarkWithDescription } from 'app/models/landmark-with-description';
import { HttpService } from 'app/services/http.service';
import { MapConstructorOptions, MapKitInitOptions } from 'ngx-apple-maps/lib/declarations';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-landmark-overview',
  templateUrl: './landmark-overview.component.html',
  styleUrls: ['./landmark-overview.component.scss']
})
export class LandmarkOverviewComponent implements OnInit {
  focus;
  focus1;

  // landmark$: Observable<Landmark>

  map
  landmarkWithDescription$: Observable<LandmarkWithDescription>;

  landmarkId: string;

  options: MapKitInitOptions = {
    language: 'en', // default browser language
    callback: (data, error) => {
    //   // return map event
    },
    JWT: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjQ1S0Q2SzhaVzgifQ.eyJpc3MiOiJXSjM2MzM3NE1ZIiwiaWF0IjoxNjQwMjY1Nzg0LCJleHAiOjE2NzE3NTM2MDB9.IXwpGhGhHI5WFFK5UXvtIXJVjYoPJIKoV4m94Wa9IGmhc4SXvyZs4NPBdEtqbO0hL81drJHXs6cGEEEPsjJzaw' // Json Web token
  }

  latitude = '55.27439'
  longitude = '25.19649'

  settings: MapConstructorOptions;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private router: Router,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) { }

  onLoaded(e) {
    this.map = e;
    this.map.addEventListener('select', (event) => {
      console.log('event ', event);
    });
  }

  tokenID = "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjQ1S0Q2SzhaVzgifQ.eyJpc3MiOiJXSjM2MzM3NE1ZIiwiaWF0IjoxNjQwMjY1Nzg0LCJleHAiOjE2NzE3NTM2MDB9.IXwpGhGhHI5WFFK5UXvtIXJVjYoPJIKoV4m94Wa9IGmhc4SXvyZs4NPBdEtqbO0hL81drJHXs6cGEEEPsjJzaw";

  private loadScript() {
    let chatScript = document.createElement("script");
    chatScript.type = "text/javascript";
    chatScript.async = true;
    chatScript.src = "../../../assets/js/mapkitimpl.js";
    document.body.appendChild(chatScript);

  }
  



  ngOnInit() {

    setTimeout(() => {
      // this.loadScript();
    }, 2000);


    // console.log(this.options);


    //     let script = this._renderer2.createElement('script');
    //     script.type = `application/ld+json`;
    //     script.text = `
    //     {
    //       "@context": "https://schema.org"
    //       const tokenID = "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjQ1S0Q2SzhaVzgifQ.eyJpc3MiOiJXSjM2MzM3NE1ZIiwiaWF0IjoxNjQwMjY1Nzg0LCJleHAiOjE2NzE3NTM2MDB9.IXwpGhGhHI5WFFK5UXvtIXJVjYoPJIKoV4m94Wa9IGmhc4SXvyZs4NPBdEtqbO0hL81drJHXs6cGEEEPsjJzaw";

    // mapkit.init({
    //     authorizationCallback: function (done) {
    //         done(tokenID);
    //     }
    // });

    // var map = new mapkit.Map("map");
    //     }
    //   `;

    //   setTimeout(() => {
    //     this._renderer2.appendChild(this._document.body, script);  
    //   }, 1800);


    // this.route.data.pipe(take(1)).subscribe((landmark) => {
    //   console.log(landmark); // do something with the data
    // });

    // this.landmark = history.state;
    // console.log(this.landmark);

    // this.route.paramMap.pipe(
    //   map(params => {
    //     let landmarkId = of(params.get('id'));
    //     console.log(landmarkId);


    //     this.httpService.getLandmarkById(landmarkId).subscribe(
    //       landmark => {
    //         this.landmarkWithDescription$ = of(landmark);
    //       }
    //     ),
    //       tap(_ => console.log(this.landmarkWithDescription$)
    //       )

    //     // return this.httpService.getLandmarkById(landmarkId).subscribe(data => return);
    //   })
    // );

    let landmarkId = this.route.snapshot.queryParams['id'];

    if (landmarkId) {
      this.httpService.getLandmarkById(landmarkId).subscribe(
        landmark => {
          this.landmarkWithDescription$ = of(landmark);
          console.log(landmark);

        }, (error) => {
          this.router.navigateByUrl('/home');
        },
      )
    } else {
      this.router.navigateByUrl('/home');
    }


    // this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     of(params.get('id'))
    //   )
    // ).subscribe(landmarkId => {
    //   console.log(landmarkId);

    //   this.httpService.getLandmarkById(landmarkId).subscribe(
    //     landmark => {
    //       this.landmarkWithDescription$ = of(landmark);
    //     }
    //   ),
    //     tap(_ => console.log(this.landmarkWithDescription$)
    //     )

    // });





    // this.route.paramMap.pipe(
    //   map(params => {
    //     let landmarkId = params.get('id');
    //     console.log(landmarkId);


    //     this.httpService.getLandmarkById(landmarkId).subscribe(
    //       landmark => {
    //         this.landmarkWithDescription$ = of(landmark);
    //       }
    //     ),
    //       tap(_ => console.log(this.landmarkWithDescription$)
    //       )
    //   })
    // );




    var body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }
}
