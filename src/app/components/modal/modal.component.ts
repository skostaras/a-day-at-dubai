import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { EndpointService } from 'app/services/http-service';
import { iif, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-ngbd-modal-component',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class NgbdModalBasic {
    closeResult: string | undefined;

    data: Date = new Date();
    focus: any;
    focus1: any;

    loginForm = new FormGroup({
        username: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
      })

    private subject = new Subject();

    constructor(private modalService: NgbModal, private endpointService: EndpointService) { 
        this.subject
        .asObservable()
        .pipe(
          switchMap(value => this.endpointService.postLogin(value))
        )
        .subscribe(result => null)
  
    }

    ngOnInit() {
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
