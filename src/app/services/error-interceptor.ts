import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication-service';
import { NotificationService } from './notification.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private notificationService: NotificationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {

            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
            }

            let errorMessage = ''

            //TODO fix this for error logout
            if (err.error.errorMessage) {
                errorMessage = err.errorMessage;
            } else if (err.errorMessage.message) {
                errorMessage = err.error.errorMessage.message;
            }

            this.notificationService.errorNotification(errorMessage);


            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}