import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Landmark } from '../../models/landmark';
import { Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { LandmarkWithDescription } from 'app/models/landmark-with-description';
import { HttpService } from 'app/services/http.service';

@Component({
  selector: 'app-landmark-overview',
  templateUrl: './landmark-overview.component.html',
  styleUrls: ['./landmark-overview.component.scss']
})
export class LandmarkOverviewComponent implements OnInit {
  focus;
  focus1;

  // landmark$: Observable<Landmark>

  landmarkWithDescription$: Observable<LandmarkWithDescription>;

  landmarkId: string;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
  ) { }

  ngOnInit() {

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
          // console.log(this.landmarkWithDescription$);
          console.log(landmark);
          // console.log(this.landmarkWithDescription$.subscribe(data => data));

        }
      )
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
