import { Component, Input, OnInit } from '@angular/core';
import { LandmarkWithPhotos } from '../../models/landmark-with-photos';

@Component({
  selector: 'app-all-landmarks',
  templateUrl: './all-landmarks.component.html',
  styleUrls: ['./all-landmarks.component.scss']
})
export class AllLandmarksComponent implements OnInit {

  @Input()
  landmarks: LandmarkWithPhotos[];

  constructor(
  ) { }

  ngOnInit() {

  }

}
