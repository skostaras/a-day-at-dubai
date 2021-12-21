import { Component } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpService } from 'app/services/http.service';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    closeResult: string | undefined;
    currentUsername: string = '';
    loggedIn = false;

    focus: any;
    focus1: any;

    loginForm = new FormGroup({
        username: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
    })

    private loginFormSubject = new Subject();
    private logoutSubject = new Subject();

    constructor(
        private modalService: NgbModal,
        private authenticationService: HttpService,
        private notificationService: NotificationService) {
        this.subscribeToLoginFormSubject();
        this.subscribeToLogoutSubject();
    }

    ngOnInit() {

        if (this.authenticationService.userValue) {
            this.loggedIn = true;
        } else {
            this.loggedIn = false;
        }

        const username = localStorage.getItem("username");
        if (username) {
            this.currentUsername = username;
        } else {
            this.currentUsername = '';
        }

        let body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        let navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
    }

    ngOnDestroy() {
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');

        let navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }

    subscribeToLoginFormSubject() {
        this.loginFormSubject
            .asObservable()
            .pipe(
                switchMap(formValue => this.authenticationService.loginRequest(formValue))
            )
            .subscribe(user => {
                this.loggedIn = true;
                this.currentUsername = this.loginForm.get("username").value;
                localStorage.setItem("username", this.currentUsername);
                this.modalService.dismissAll();
                this.notificationService.successNotification(this.currentUsername + ' Successfully Logged In.');
                this.loginForm.reset();
            })
    }

    subscribeToLogoutSubject() {
        this.logoutSubject
            .asObservable()
            .pipe(
                switchMap(value => this.authenticationService.logoutRequest())
            )
            .subscribe(message => {
                this.loggedIn = false;
                this.notificationService.successNotification(message.message);
            })
    }

    login() {
        this.loginFormSubject.next(this.loginForm.value);
        this.subscribeToLoginFormSubject();
    }

    logout() {
        if (confirm("Are you sure you want to logout?")) {
            this.logoutSubject.next();
            this.subscribeToLogoutSubject();
        }
    }


    open(content: any, type: string, modalDimension: string | undefined) {
        if (modalDimension === 'sm' && type === 'modal_mini') {
            this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm' }).result.then((result) => {
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

}
