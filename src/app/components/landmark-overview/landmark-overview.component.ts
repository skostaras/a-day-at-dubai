import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landmark-overview',
  templateUrl: './landmark-overview.component.html',
  styleUrls: ['./landmark-overview.component.scss']
})
export class LandmarkOverviewComponent implements OnInit {
  focus;
  focus1;

  constructor() { }

  ngOnInit() {

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
