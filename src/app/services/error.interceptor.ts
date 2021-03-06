import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from './notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private notificationService: NotificationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(error => {

            this.notificationService.errorNotification(this.getBackendErrorMessage(error));
            return throwError(error);
        }))
    }

    getBackendErrorMessage(err) {
        let errorMessage = ''

        if (typeof err.error != 'undefined' && typeof err.error.errorMessage != 'undefined' && typeof err.error.errorMessage.message != 'undefined') {
            errorMessage = err.error.errorMessage.message;
        } else if (typeof err.errorMessage != 'undefined' && typeof err.errorMessage.message != 'undefined') {
            errorMessage = err.errorMessage.message;
        } else if (typeof err.error != 'undefined' && typeof err.error.message != 'undefined') {
            errorMessage = err.error.message
        } else if (typeof err.error != 'undefined' && typeof err.error.errorMessage != 'undefined') {
            errorMessage = err.error.errorMessage
        }

        return errorMessage;
    }
}