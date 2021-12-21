import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthenticationService } from '../../services/authentication-service';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;

    constructor(public location: Location, private element: ElementRef,
        private authenticationService: AuthenticationService
    ) {
        this.sidebarVisible = false;
    }

    //TODO dummy
    private logoutSubject = new Subject();

    test() {
        console.log("test");

        this.logoutSubject.next();
        this.subscribeToLogoutSubject();

    }

    ngOnInit() {
        this.subscribeToLogoutSubject();

        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    }

    subscribeToLogoutSubject() {
        this.logoutSubject
        .asObservable()
        .pipe(
            switchMap(value => this.authenticationService.logout())
        )
        .subscribe(user => {
            // this.currentUsername = this.loginForm.get("username").value;
            // localStorage.setItem("username", this.currentUsername);
            // this.modalService.dismissAll();
            // this.notificationService.successNotification(this.currentUsername + ' you are now logged in.');
        })

    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee === '/documentation') {
            return true;
        }
        else {
            return false;
        }
    }
}
