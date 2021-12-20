import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { EndpointService } from 'app/services/http-service';
import { iif, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthenticationService, User } from 'app/services/authentication-service';
import { IAlert } from '../notification/notification.component';

@Component({
    selector: 'app-login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    closeResult: string | undefined;
    currentUsername: string = '';

    data: Date = new Date();
    focus: any;
    focus1: any;
    alert: IAlert;

    loginForm = new FormGroup({
        username: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
    })

    private subject = new Subject();


    //TODO logout make current null

    constructor(
        private modalService: NgbModal,
        private endpointService: EndpointService,
        private authenticationService: AuthenticationService) {
        this.subject
            .asObservable()
            .pipe(
                switchMap(value => this.authenticationService.postLogin(value))
            )
            .subscribe(user => {
                this.currentUsername = this.loginForm.get("username").value;
                localStorage.setItem("username", this.currentUsername);
                this.modalService.dismissAll();
                this.createSuccessAlert();
            })
    }

    ngOnInit() {
        const username = localStorage.getItem("username");
        if (username) {
            this.currentUsername = username;
        }
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
    }

    ngOnDestroy() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }

    onSubmit() {
        console.log(this.loginForm.get("username").value);
        console.log(this.loginForm.get("password").value);
        this.subject.next(this.loginForm.value);
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

    //TODO doens;'t work
    createSuccessAlert() {
        this.alert.icon = 'ui-1_check';
        this.alert.id = 1;
        this.alert.type = "success";
        this.alert.strong = "Success";
        this.alert.message = this.currentUsername + " you are now logged in."
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
